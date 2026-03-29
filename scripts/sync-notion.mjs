import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "src", "content", "blog");
const mapFile = path.join(contentDir, ".notion-sync-map.json");

function loadDotenv(filepath) {
  if (!fsSync.existsSync(filepath)) return;
  const raw = fsSync.readFileSync(filepath, "utf8");
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex < 0) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotenv(path.join(rootDir, ".env"));

const notionToken = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID ?? process.env.NOTION_PAGE_ID;
const forceSync = process.env.FORCE_NOTION_SYNC === "1";

if (!notionToken || !notionDatabaseId) {
  console.log("[sync:notion] NOTION_TOKEN 또는 NOTION_DATABASE_ID가 없어 동기화를 건너뜁니다.");
  process.exit(0);
}

const notion = new Client({ auth: notionToken });
const n2m = new NotionToMarkdown({ notionClient: notion });

function normalizeNotionId(rawId) {
  const trimmed = (rawId ?? "").trim();
  const uuidFromText = trimmed.match(/[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}/);
  if (!uuidFromText) return trimmed.replace(/-/g, "");
  return uuidFromText[0].replace(/-/g, "");
}

function slugify(input) {
  const lowered = input.toLowerCase().trim();
  const ascii = lowered
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return ascii || "notion-post";
}

function getProperty(properties, candidates) {
  for (const key of candidates) {
    if (properties[key]) return properties[key];
  }
  return null;
}

function readTitle(page) {
  const prop = getProperty(page.properties, ["Title", "title", "이름", "Name"]);
  if (prop?.type === "title") {
    return prop.title.map((token) => token.plain_text).join("").trim();
  }
  return "Untitled";
}

function readRichText(properties, keys, fallback = "") {
  const prop = getProperty(properties, keys);
  if (!prop) return fallback;
  if (prop.type === "rich_text") {
    return prop.rich_text.map((token) => token.plain_text).join("").trim() || fallback;
  }
  if (prop.type === "title") {
    return prop.title.map((token) => token.plain_text).join("").trim() || fallback;
  }
  return fallback;
}

function readSelect(properties, keys, fallback = "Uncategorized") {
  const prop = getProperty(properties, keys);
  if (prop?.type === "select") {
    return prop.select?.name ?? fallback;
  }
  return fallback;
}

function readMultiSelect(properties, keys) {
  const prop = getProperty(properties, keys);
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((item) => item.name).filter(Boolean);
  }
  return [];
}

function readDate(properties, keys, fallback) {
  const prop = getProperty(properties, keys);
  if (prop?.type === "date" && prop.date?.start) {
    return prop.date.start;
  }
  return fallback;
}

function escapeYamlString(value) {
  return JSON.stringify(value ?? "");
}

async function loadMap() {
  try {
    const raw = await fs.readFile(mapFile, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function saveMap(map) {
  await fs.writeFile(mapFile, `${JSON.stringify(map, null, 2)}\n`, "utf8");
}

async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

async function queryAllDatabasePages(databaseId) {
  const pages = [];
  let startCursor = undefined;

  while (true) {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      start_cursor: startCursor,
    });

    for (const result of response.results) {
      if (result.object === "page" && !result.archived && !result.in_trash) {
        pages.push(result);
      }
    }

    if (!response.has_more || !response.next_cursor) break;
    startCursor = response.next_cursor;
  }

  return pages;
}

function resolveOutputFileName(baseSlug, pageId, map, usedFiles) {
  let nextFile = `${baseSlug}.md`;
  const outputPath = path.join(contentDir, nextFile);

  if (usedFiles.has(nextFile) || fsSync.existsSync(outputPath)) {
    const suffix = pageId.slice(0, 6);
    nextFile = `${baseSlug}-${suffix}.md`;
  }

  while (usedFiles.has(nextFile) || fsSync.existsSync(path.join(contentDir, nextFile))) {
    nextFile = `${baseSlug}-${pageId.slice(0, 6)}-${Math.random().toString(36).slice(2, 6)}.md`;
  }

  return nextFile;
}

async function run() {
  const databaseId = normalizeNotionId(notionDatabaseId);
  if (!/^[0-9a-fA-F]{32}$/.test(databaseId)) {
    throw new Error(`NOTION_DATABASE_ID 형식이 올바르지 않습니다: ${notionDatabaseId}`);
  }

  if (!process.env.NOTION_DATABASE_ID && process.env.NOTION_PAGE_ID) {
    console.warn("[sync:notion] NOTION_PAGE_ID로 실행 중입니다. NOTION_DATABASE_ID 사용을 권장합니다.");
  }

  const map = await loadMap();
  const usedFiles = new Set(Object.values(map));
  const pages = await queryAllDatabasePages(databaseId);

  let synced = 0;
  let skipped = 0;

  for (const page of pages) {
    const pageId = normalizeNotionId(page.id);
    const mappedFile = map[pageId];

    if (!forceSync && mappedFile && (await fileExists(path.join(contentDir, mappedFile)))) {
      skipped += 1;
      continue;
    }

    const title = readTitle(page);
    const description = readRichText(page.properties, ["Description", "description", "요약"], "");
    const category = readSelect(page.properties, ["Category", "category", "카테고리"], "Uncategorized");
    const tags = readMultiSelect(page.properties, ["Tags", "tags", "태그"]);
    const pubDate = readDate(page.properties, ["PubDate", "pubDate", "Published", "작성일"], page.created_time);
    const updatedDate = readDate(page.properties, ["Updated", "updatedDate", "수정일"], page.last_edited_time);
    const slugProperty = readRichText(page.properties, ["Slug", "slug"], "");
    const slug = slugify(slugProperty || title);
    const nextFile = mappedFile ?? resolveOutputFileName(slug, pageId, map, usedFiles);

    const blocks = await n2m.pageToMarkdown(pageId);
    const markdownBody = n2m.toMarkdownString(blocks).parent.trim();
    const frontmatter = [
      "---",
      `title: ${escapeYamlString(title)}`,
      `description: ${escapeYamlString(description || `${title} 포스트`)}`,
      `category: ${escapeYamlString(category)}`,
      `pubDate: ${escapeYamlString(pubDate)}`,
      `updatedDate: ${escapeYamlString(updatedDate)}`,
      `tags: [${tags.map((tag) => escapeYamlString(tag)).join(", ")}]`,
      "---",
      "",
    ].join("\n");

    const output = `${frontmatter}${markdownBody}\n`;
    const outputPath = path.join(contentDir, nextFile);
    await fs.writeFile(outputPath, output, "utf8");

    map[pageId] = nextFile;
    usedFiles.add(nextFile);
    synced += 1;
    console.log(`[sync:notion] 동기화 완료: ${outputPath}`);
  }

  await saveMap(map);
  console.log(`[sync:notion] 완료: synced=${synced}, skipped=${skipped}, total=${pages.length}`);
}

run().catch((error) => {
  if (error?.code === "object_not_found") {
    console.error("[sync:notion] 데이터베이스 또는 페이지를 찾을 수 없습니다. 아래를 확인하세요.");
    console.error("1) Notion 데이터베이스 Share > Invite로 integration을 추가했는지");
    console.error("2) NOTION_DATABASE_ID가 올바른 데이터베이스 UUID 또는 URL인지");
    console.error("3) NOTION_TOKEN이 같은 integration의 토큰인지");
  }
  console.error("[sync:notion] 동기화 실패", error);
  process.exit(1);
});
