# GitHub Pages 정적 블로그 구축 계획

이 문서는 `mete0rfish.github.io`에 정적 블로그를 구축하기 위한 설계 및 단계별 구현 계획을 담고 있습니다.

## 1. 개요 (Objective)
- **목표**: GitHub Pages를 이용한 빠르고 SEO 친화적인 개인 정적 블로그 구축
- **핵심 가치**: 성능(Performance), 유지보수성(Maintainability), 확장성(Scalability)

## 2. 기술 스택 (Technical Stack)
- **프레임워크**: [Astro](https://astro.build/) (정적 사이트 생성에 최적화됨)
- **스타일링**: **Vanilla CSS** (성능과 표준 준수를 위해 라이브러리 최소화)
- **콘텐츠**: Markdown 및 MDX (이미지 및 상호작용 가능한 요소 포함 가능)
- **배포**: GitHub Actions를 통한 자동 배포 (GitHub Pages 호스팅)

## 3. 주요 기능 (Key Features)
- **블로그 포스트**: Markdown 기반의 글 작성 및 관리
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 최적화
- **카테고리 및 태그**: 게시물 분류 및 검색 용이성 제공
- **SEO 최적화**: 시맨틱 HTML, Sitemap 생성, RSS 피드 제공
- **다크 모드**: 사용자 편의를 위한 테마 전환 기능

## 4. 구현 단계 (Implementation Steps)

### Phase 1: 초기 설정 및 인프라
- [x] Astro 프로젝트 초기화 (Static 모드)
- [x] 폴더 구조 설계 (`src/content/blog`, `src/layouts`, `src/components`)
- [x] GitHub Actions 워크플로우 설정 (`.github/workflows/deploy.yml`)

### Phase 2: 레이아웃 및 스타일링
- [x] 기본 레이아웃 컴포넌트 구현 (HTML/Head/Body 구조)
- [x] 공통 헤더(Navigation) 및 푸터 개발
- [x] Vanilla CSS를 활용한 글로벌 스타일 및 타이포그래피 설정

### Phase 3: 블로그 핵심 기능 구현
- [x] Markdown 포스트 렌더링을 위한 `[slug].astro` 구현
- [x] 블로그 목록 페이지(Index) 개발
- [x] 태그 및 카테고리 필터링 기능 추가 (목록 페이지 내 UI 포함)

### Phase 4: 완성도 향상 및 SEO
- [ ] RSS 피드 (`rss.xml`) 및 Sitemap 생성 설정
- [ ] SEO 메타 태그 (OpenGraph, Twitter Cards) 추가
- [ ] 404 페이지 커스터마이징

## 5. 확인 및 테스트 (Verification & Testing)
- [x] `npm run build`를 통한 정적 파일 생성 확인
- [ ] Lighthouse 점수 측정 (LCP, FID, CLS 등)
- [ ] GitHub Pages 실제 배포 후 URL 접근성 및 동작 확인
