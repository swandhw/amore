import { http as o, HttpResponse as e } from "msw";
const d = [
  {
    cudType: "",
    prdCi: "MK",
    badCi: "0001",
    badCode: "BC-001",
    badCodeName: "스크래치",
    cudCi: "Y",
    remark: "출하 전 검사"
  },
  {
    cudType: "",
    prdCi: "MK",
    badCi: "0001",
    badCode: "BC-002",
    badCodeName: "라벨 누락",
    cudCi: "Y",
    remark: "1차 포장 공정"
  },
  {
    cudType: "",
    prdCi: "SC",
    badCi: "0002",
    badCode: "BC-003",
    badCodeName: "혼입",
    cudCi: "N",
    remark: "샘플 검증"
  }
], r = [
  { codeKorName: "등록", commCode: "C" },
  { codeKorName: "수정", commCode: "U" },
  { codeKorName: "삭제", commCode: "D" }
], c = [
  { codeKorName: "메이크업", commCode: "MK" },
  { codeKorName: "스킨케어", commCode: "SC" }
], m = [
  { codeKorNameRe: "원불량", commCode: "0001" },
  { codeKorNameRe: "사파불량", commCode: "0002" }
], i = [
  { codeKorName: "Yes", commCode: "Y" },
  { codeKorName: "No", commCode: "N" }
], t = [
  { codeKorNameRe: "Yes", commCode: "Y" },
  { codeKorNameRe: "No", commCode: "N" }
], n = [
  { codeKorNameRe: "원불량", commCode: "0001" },
  { codeKorNameRe: "사파불량", commCode: "0002" }
], b = [
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register", async () => e.json({ message: d })),
  o.post("/api/bff/basic-infos/ai-transform/bad-code-register/commands/save", async ({ request: a }) => {
    const s = await a.json();
    return e.json({ message: s });
  }),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/cud-type", () => e.json({ message: r })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/product-category", () => e.json({ message: c })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/bad-code-category", () => e.json({ message: m })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/use-status", () => e.json({ message: i })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/use-status-combo", () => e.json({ message: t })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/code-type", () => e.json({ message: n })),
  o.get("/api/bff/basic-infos/ai-transform/bad-code-register/options/empty", () => e.json({ message: [] }))
];
export {
  b as badCodeRegisterHandlers
};
