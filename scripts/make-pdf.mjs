// 포트폴리오 PDF 파일을 다시 만듭니다: 개발 서버(npm run dev)를 켠 뒤 npm run pdf
// 설치된 Chrome(없으면 Edge)으로 /print 페이지를 PDF 로 저장해 public/ 에 둡니다.
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.env.PDF_BASE_URL ?? "http://localhost:3000";
const browser = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
].find((path) => existsSync(path));
if (!browser) throw new Error("Chrome 또는 Edge 를 찾지 못했습니다.");

for (const lang of ["ko", "en"]) {
  const out = resolve("public", `portfolio-${lang}.pdf`);
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=60000",
    `--print-to-pdf=${out}`,
    `${BASE}/print?lang=${lang}`
  ], { stdio: "ignore" });
  console.log(out, Math.round(statSync(out).size / 1024) + " KB");
}
