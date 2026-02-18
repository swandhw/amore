import { http as e, delay as t, HttpResponse as a } from "msw";
const r = [
  {
    productCode: "NP-001",
    productName: "모이스처 크림",
    categoryName: "스킨케어",
    price: 22e3,
    useStatus: "Y",
    remark: "기본 등록"
  },
  {
    productCode: "NP-002",
    productName: "컬러 립밤",
    categoryName: "메이크업",
    price: 15e3,
    useStatus: "Y",
    remark: "봄 시즌용"
  },
  {
    productCode: "NP-003",
    productName: "바디 미스트",
    categoryName: "바디",
    price: 18e3,
    useStatus: "N",
    remark: "시즌 종료"
  }
], p = [
  e.get("/api/bff/basic-infos/new-products", async () => (await t(300), a.json({
    code: "200",
    status: "SUCCESS",
    message: r
  }))),
  e.post("/api/bff/basic-infos/new-products/commands/save", async ({ request: s }) => {
    const o = await s.json();
    return await t(500), a.json({
      code: "200",
      status: "SUCCESS",
      message: o
    });
  })
];
export {
  p as newProductRegisterHandlers
};
