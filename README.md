# 🚀 Mete0rfish.github.io - Astro 정적 블로그

이 프로젝트는 [Astro](https://astro.build/) 프레임워크와 **Vanilla CSS**를 사용하여 구축된 개인 정적 블로그입니다. GitHub Actions를 통해 GitHub Pages에 자동으로 배포됩니다.

## 🛠️ 시작하기

### 1. 사전 준비
- [Node.js](https://nodejs.org/) (v18.17.1, v20.3.0 또는 최신 LTS 권장)
- npm (Node.js 설치 시 함께 설치됨)

### 2. 의존성 설치
터미널에서 프로젝트 루트 디렉토리로 이동한 후 다음 명령어를 실행합니다.

```bash
npm install
```

### 3. 로컬 개발 서버 실행
코드를 수정하면서 실시간으로 블로그를 확인하려면 아래 명령어를 실행하세요.

```bash
npm run dev
```
실행 후 브라우저에서 `http://localhost:4321` 주소로 접속할 수 있습니다.

---

## ✍️ 블로그 글 작성 방법

새로운 블로그 포스트를 작성하려면 `src/content/blog/` 디렉토리에 새로운 Markdown(`.md`) 파일을 생성하세요.

### 포스트 구조 (Frontmatter)
모든 포스트 파일 상단에는 아래와 같은 메타데이터(Frontmatter)가 포함되어야 합니다.

```markdown
---
title: "포스트의 제목"
description: "목록 페이지에 표시될 짧은 요약"
pubDate: "2026-03-18" # YYYY-MM-DD 형식
tags: ["Astro", "Web"] # 태그 목록 (선택 사항)
heroImage: "/blog-placeholder.jpg" # 대표 이미지 경로 (선택 사항)
---

# 여기에 본문 내용을 작성하세요.
Markdown 문법을 그대로 사용하실 수 있습니다.
```

## Notion 데이터베이스에서 포스트 가져오기

이 프로젝트는 빌드 전에 Notion 데이터베이스의 페이지들을 Markdown으로 동기화할 수 있습니다.

### 1. Notion Integration 준비
- Notion에서 Internal Integration 생성 후 토큰 발급
- 가져올 데이터베이스 페이지에 해당 Integration을 `Invite`로 연결

### 2. 환경 변수 설정
루트에 `.env` 파일을 만들고 아래 값을 채웁니다.

```bash
NOTION_TOKEN=secret_xxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`NOTION_DATABASE_ID`는 데이터베이스 URL의 UUID(하이픈 포함/미포함 모두 가능)입니다.

### 3. Notion 페이지 속성(권장)
스크립트는 아래 속성명을 우선 탐색합니다. (없으면 기본값 사용)
- 제목: `Title` 또는 `title` 또는 `이름` 또는 `Name`
- 요약: `Description` 또는 `description` 또는 `요약`
- 카테고리(select): `Category` 또는 `category` 또는 `카테고리`
- 태그(multi_select): `Tags` 또는 `tags` 또는 `태그`
- 발행일(date): `PubDate` 또는 `pubDate` 또는 `Published` 또는 `작성일`
- 수정일(date): `Updated` 또는 `updatedDate` 또는 `수정일`
- 슬러그(rich_text): `Slug` 또는 `slug` (없으면 제목으로 자동 생성)

### 4. 실행
```bash
npm run sync:notion   # Notion -> src/content/blog/*.md 동기화
npm run build         # sync:notion 후 Astro 빌드
```

기본 동작은 "이미 동기화된 페이지는 건너뜀"입니다.  
강제로 재동기화하려면 아래처럼 실행하세요.

```bash
FORCE_NOTION_SYNC=1 npm run sync:notion
```

### 5. GitHub Actions 배포 시
GitHub 저장소 Settings > Secrets and variables > Actions에 아래 Secret을 추가하세요.
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

---

## 🚀 배포 및 관리

### 1. 자동 배포 (GitHub Actions)
`main` 브랜치에 코드를 `push`하면 GitHub Actions 워크플로우가 자동으로 실행되어 빌드 및 배포를 진행합니다.

```bash
git add .
git commit -m "새로운 포스트 추가"
git push origin main
```

### 2. 수동 빌드 및 미리보기
배포 전 로컬에서 최종 빌드 결과물을 확인하고 싶을 때 사용합니다.

```bash
# 정적 파일 생성 (dist/ 폴더)
npm run build

# 빌드된 결과물 로컬 서버로 확인
npm run preview
```

---

## 📁 프로젝트 구조

- `src/content/blog/`: 블로그 Markdown 포스트 저장소
- `src/layouts/`: 공통 레이아웃 (헤더, 푸터, 전역 스타일 등)
- `src/pages/`: 개별 페이지 (Home, Blog 목록, About 등)
- `public/`: 정적 자산 (이미지, 파비콘 등)
- `astro.config.mjs`: Astro 설정 파일
- `.github/workflows/deploy.yml`: GitHub Actions 배포 설정

---

## 📄 라이선스
이 블로그의 코드는 오픈 소스이며 자유롭게 수정 및 사용이 가능합니다.
