# 김민경 포트폴리오

Next.js(App Router) + Tailwind CSS로 만든 프로젝트 포트폴리오 사이트입니다. 홈에서 3개 파트(고객·시장 인사이트 / AI Service 제작 및 운영 / 전사 AI Transformation)로 묶인 프로젝트를 보여 주고, 프로젝트마다 개별 페이지가 있습니다.

## 내용 고치기

- 프로젝트 내용: `src/data/projects.ts` 한 파일에서 전부 고칩니다. 제목·기간·목적·성과·역할·진행 단계·인사이트·이미지를 항목별로 적습니다.
- 이미지: `public/projects/` 에 넣고 `image.src` 에 `/projects/파일명` 으로 적습니다. `width`·`height` 는 실제 픽셀 크기를 적습니다.
- 프로필 문구: 같은 파일의 `PROFILE` 입니다.
- 색상·다크 모드: `src/app/globals.css` 의 CSS 변수입니다. 파트별 색은 `--part-1`, `--part-2`, `--part-3` 입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 배포 (GitHub → Vercel)

1. GitHub에 저장소를 만들고 이 폴더를 push 합니다.
2. https://vercel.com/new 에서 그 저장소를 Import 합니다. 프레임워크는 Next.js로 자동 인식되고 설정 변경 없이 Deploy 하면 됩니다.
3. 이후에는 `main` 브랜치에 push 할 때마다 자동으로 다시 배포됩니다.

## 화면 구조

- `/` : 서비스기획 포트폴리오. 로그인 없이 누구나 봅니다. 허브로 가는 링크는 없습니다.
- `/projects/<slug>` : 프로젝트 개별 페이지.
- `/entry` : 직무별 포트폴리오를 고르는 허브(메인). 비밀번호를 맞혀야 열리고, 검색엔진에 노출하지 않습니다(noindex). 어디에서도 링크하지 않으므로 주소를 아는 사람만 들어옵니다.

허브 비밀번호는 환경변수 `HUB_PASSWORD` 하나로 정합니다.

- 로컬: `.env.local` 에 `HUB_PASSWORD=원하는값` (이 파일은 git 에 올라가지 않습니다)
- Vercel: Project → Settings → Environment Variables 에 `HUB_PASSWORD` 추가 후 Redeploy

직무 목록은 `src/data/jobs.ts` 에서 고칩니다. 새 직무 화면은 `src/app/(그룹)/` 아래에 독립된 경로로 만들고 `href` 만 연결하면 됩니다.

## 프로젝트 분류

대분류(Part) → 중분류(group) → 프로젝트 순서로 보여 줍니다. 중분류는 `src/data/projects.ts` 각 프로젝트의 `group` 값이고, 같은 값끼리 등장 순서대로 묶입니다.
