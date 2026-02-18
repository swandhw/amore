import { n as r } from "../../../../utils.js";
import { apiPost as d } from "../../../../api/httpClient.js";
const c = [
  {
    productCategory: "MK",
    badCodeCategory: "0001",
    badCode: "BC-001",
    badCodeName: "스크래치",
    useStatus: "Y",
    remark: "출하 전 검사"
  },
  {
    productCategory: "MK",
    badCodeCategory: "0001",
    badCode: "BC-002",
    badCodeName: "라벨 누락",
    useStatus: "Y",
    remark: "1차 포장 공정"
  },
  {
    productCategory: "SC",
    badCodeCategory: "0002",
    badCode: "BC-003",
    badCodeName: "혼입",
    useStatus: "N",
    remark: "샘플 검증"
  }
], C = async (e) => {
  const o = r(e?.codeType), s = r(e?.useStatus), a = {
    result: "true",
    message: "",
    responseBody: c.filter((t) => !(o && t.badCodeCategory !== o || s && t.useStatus !== s))
  };
  return Promise.resolve(a);
}, i = async (e, o) => d("/badCodeRegisters", e, o), y = async () => {
  const e = {
    result: "true",
    message: "",
    responseBody: [{
      codeKorName: "메이크업",
      commCode: "MK"
    }, {
      codeKorName: "스킨케어",
      commCode: "SC"
    }]
  };
  return Promise.resolve(e);
}, l = async () => new Promise((e) => {
  setTimeout(() => {
    e({
      result: "true",
      message: "",
      responseBody: [{
        codeKorName: "Yes",
        commCode: "Y"
      }, {
        codeKorName: "No",
        commCode: "N"
      }]
    });
  }, 2e3);
}), g = async () => new Promise((e) => {
  setTimeout(() => {
    e({
      result: "true",
      message: "",
      responseBody: [
        {
          codeKorNameRe: "원불량",
          commCode: "0001"
        },
        {
          codeKorNameRe: "사파불량",
          commCode: "0002"
        }
      ]
    });
  }, 1e3);
});
export {
  C as fetchBadCodeRegisters,
  g as fetchDsCombo1,
  l as fetchDsSearchListResult14Row,
  y as fetchDsSearchListResult535Row,
  i as saveBadCodeRegisters
};
