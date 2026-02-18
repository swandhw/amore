import { http as c, HttpResponse as p } from "msw";
const n = [
  { codeKorName: "등록", commCode: "C" },
  { codeKorName: "수정", commCode: "U" },
  { codeKorName: "삭제", commCode: "D" }
], i = [
  { codeKorName: "서울", commCode: "PL01" },
  { codeKorName: "인천", commCode: "PL02" }
], C = [
  { codeKorName: "스킨케어", codeKorNameRe: "Skin", commCode: "SC" },
  { codeKorName: "메이크업", codeKorNameRe: "Makeup", commCode: "MK" }
], u = [
  { codeKorName: "혼합", commCode: "MIX" },
  { codeKorName: "충전", commCode: "FILL" },
  { codeKorName: "포장", commCode: "PACK" }
], l = [
  { codeKorName: "Yes", commCode: "Y" },
  { codeKorName: "No", commCode: "N" }
], m = [
  { procCode: "P-100", procName: "기초공정", prdCi: "SC" },
  { procCode: "P-110", procName: "혼합공정", prdCi: "SC" },
  { procCode: "P-200", procName: "색조공정", prdCi: "MK" },
  { procCode: "P-210", procName: "포장공정", prdCi: "MK" }
], f = [
  {
    cudType: "",
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-100",
    procName: "기초공정",
    routeSeq: "10",
    remark: "기본 흐름",
    cudCi: "Y"
  },
  {
    cudType: "",
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-110",
    procName: "혼합공정",
    routeSeq: "20",
    remark: "배치 혼합",
    cudCi: "Y"
  },
  {
    cudType: "",
    plant: "PL02",
    prdCi: "MK",
    procCode: "P-200",
    procName: "색조공정",
    routeSeq: "10",
    remark: "톤 조정",
    cudCi: "N"
  }
], P = [
  {
    cudType: "",
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-100",
    procDtlCode: "S-101",
    procDtlName: "원료 투입",
    routeSeq: "1",
    procType: "MIX",
    cudCi: "Y",
    remark: "투입 순서 확인"
  },
  {
    cudType: "",
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-110",
    procDtlCode: "S-111",
    procDtlName: "온도 조절",
    routeSeq: "2",
    procType: "MIX",
    cudCi: "Y",
    remark: "온도 모니터링"
  },
  {
    cudType: "",
    plant: "PL02",
    prdCi: "MK",
    procCode: "P-200",
    procDtlCode: "S-201",
    procDtlName: "분산",
    routeSeq: "1",
    procType: "FILL",
    cudCi: "N",
    remark: "분산 속도 체크"
  }
], N = [
  {
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-100",
    procName: "기초공정",
    procDtlCode: "S-101",
    procDtlName: "원료 투입",
    procType: "MIX",
    remark: "투입 순서 확인"
  },
  {
    plant: "PL01",
    prdCi: "SC",
    procCode: "P-110",
    procName: "혼합공정",
    procDtlCode: "S-111",
    procDtlName: "온도 조절",
    procType: "MIX",
    remark: "온도 모니터링"
  },
  {
    plant: "PL02",
    prdCi: "MK",
    procCode: "P-200",
    procName: "색조공정",
    procDtlCode: "S-201",
    procDtlName: "분산",
    procType: "FILL",
    remark: "분산 속도 체크"
  }
], K = [
  c.get("/api/bff/basic-infos/dpmasm-process/options/cud-types", () => p.json({ result: "true", message: "OK", responseBody: n })),
  c.get("/api/bff/basic-infos/dpmasm-process/options/plants", () => p.json({ result: "true", message: "OK", responseBody: i })),
  c.get("/api/bff/basic-infos/dpmasm-process/options/product-categories", () => p.json({ result: "true", message: "OK", responseBody: C })),
  c.get("/api/bff/basic-infos/dpmasm-process/options/proc-types", () => p.json({ result: "true", message: "OK", responseBody: u })),
  c.get("/api/bff/basic-infos/dpmasm-process/options/use-status", () => p.json({ result: "true", message: "OK", responseBody: l })),
  c.get("/api/bff/basic-infos/dpmasm-process/options/proc-codes", ({ request: o }) => {
    const r = new URL(o.url).searchParams.get("prdCi"), t = r ? m.filter((s) => s.prdCi === r) : m;
    return p.json({
      result: "true",
      message: "OK",
      responseBody: t.map(({ procCode: s, procName: a }) => ({ procCode: s, procName: a }))
    });
  }),
  c.get("/api/bff/basic-infos/dpmasm-process/proc", ({ request: o }) => {
    const e = new URL(o.url), r = e.searchParams.get("prdCi"), t = e.searchParams.get("procCode"), s = e.searchParams.get("cudCi"), a = f.filter((d) => !(r && d.prdCi !== r || t && d.procCode !== t || s && d.cudCi !== s));
    return p.json({
      result: "true",
      message: "OK",
      responseBody: a
    });
  }),
  c.get("/api/bff/basic-infos/dpmasm-process/proc-dtl", ({ request: o }) => {
    const e = new URL(o.url), r = e.searchParams.get("prdCi"), t = e.searchParams.get("procCode"), s = e.searchParams.get("cudCi"), a = P.filter((d) => !(r && d.prdCi !== r || t && d.procCode !== t || s && d.cudCi !== s));
    return p.json({
      result: "true",
      message: "OK",
      responseBody: a
    });
  }),
  c.get("/api/bff/basic-infos/dpmasm-process/tab2", ({ request: o }) => {
    const e = new URL(o.url), r = e.searchParams.get("prdCi"), t = e.searchParams.get("procCode"), s = N.filter((a) => !(r && a.prdCi !== r || t && a.procCode !== t));
    return p.json({
      result: "true",
      message: "OK",
      responseBody: s
    });
  }),
  c.post("/api/bff/basic-infos/dpmasm-process/commands/save-proc", async ({ request: o }) => {
    const e = await o.json();
    return p.json({
      result: "true",
      message: "OK",
      responseBody: e
    });
  }),
  c.post("/api/bff/basic-infos/dpmasm-process/commands/save-proc-dtl", async ({ request: o }) => {
    const e = await o.json();
    return p.json({
      result: "true",
      message: "OK",
      responseBody: e
    });
  })
];
export {
  K as dpmasmProcessHandlers
};
