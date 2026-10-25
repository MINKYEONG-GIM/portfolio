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
