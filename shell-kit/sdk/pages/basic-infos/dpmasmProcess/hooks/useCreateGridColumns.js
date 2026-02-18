import { createDataMap as e } from "../../../../components/ap-wijmo/grid/Util.js";
const o = ({
  dsPlantOptions: d,
  dsPrdCiOptions: a,
  dsCudCiOptions: t
}) => [
  {
    header: "사업장",
    width: 100,
    binding: "plant",
    dataType: "String",
    dataMap: e(d, "commCode", "codeKorName")
  },
  {
    header: "대공정 코드",
    width: 120,
    binding: "procCode",
    dataType: "String"
  },
  {
    header: "대공정",
    width: 180,
    binding: "procName",
    dataType: "String"
  },
  {
    header: "제품구분",
    width: 140,
    binding: "prdCi",
    dataType: "String",
    dataMap: e(a, "commCode", "codeKorName")
  },
  {
    header: "순번",
    width: 90,
    binding: "routeSeq",
    dataType: "String"
  },
  {
    header: "사용유무",
    width: 110,
    binding: "cudCi",
    dataType: "String",
    dataMap: e(t, "commCode", "codeKorName")
  },
  {
    header: "비고",
    width: "*",
    binding: "remark",
    dataType: "String"
  }
], p = ({
  dsPlantOptions: d,
  dsPrdCiOptions: a,
  dsProcCdOptions: t,
  dsProcTypeOptions: i,
  dsCudCiOptions: r
}) => [
  {
    header: "사업장",
    width: 100,
    binding: "plant",
    dataType: "String",
    dataMap: e(d, "commCode", "codeKorName")
  },
  {
    header: "제품구분",
    width: 140,
    binding: "prdCi",
    dataType: "String",
    dataMap: e(a, "commCode", "codeKorNameRe")
  },
  {
    header: "대공정",
    width: 160,
    binding: "procCode",
    dataType: "String",
    dataMap: e(t, "procCode", "procName")
  },
  {
    header: "소공정 코드",
    width: 120,
    binding: "procDtlCode",
    dataType: "String"
  },
  {
    header: "소공정",
    width: 200,
    binding: "procDtlName",
    dataType: "String"
  },
  {
    header: "공정유형",
    width: 130,
    binding: "procType",
    dataType: "String",
    dataMap: e(i, "commCode", "codeKorName")
  },
  {
    header: "순번",
    width: 90,
    binding: "routeSeq",
    dataType: "String"
  },
  {
    header: "작업내용",
    width: "*",
    binding: "remark",
    dataType: "String"
  },
  {
    header: "사용유무",
    width: 110,
    binding: "cudCi",
    dataType: "String",
    dataMap: e(r, "commCode", "codeKorName")
  }
], g = ({
  dsPlantOptions: d,
  dsPrdCiOptions: a,
  dsProcTypeOptions: t
}) => [
  {
    header: "사업장",
    width: 100,
    binding: "plant",
    dataType: "String",
    isReadOnly: !0,
    dataMap: e(d, "commCode", "codeKorName")
  },
  {
    header: "제품구분",
    width: 140,
    binding: "prdCi",
    dataType: "String",
    isReadOnly: !0,
    dataMap: e(a, "commCode", "codeKorNameRe")
  },
  {
    header: "대공정 코드",
    width: 140,
    binding: "procCode",
    dataType: "String",
    isReadOnly: !0
  },
  {
    header: "대공정",
    width: 200,
    binding: "procName",
    dataType: "String",
    isReadOnly: !0
  },
  {
    header: "소공정 코드",
    width: 140,
    binding: "procDtlCode",
    dataType: "String",
    isReadOnly: !0
  },
  {
    header: "소공정",
    width: 200,
    binding: "procDtlName",
    dataType: "String",
    isReadOnly: !0
  },
  {
    header: "공정유형",
    width: 130,
    binding: "procType",
    dataType: "String",
    isReadOnly: !0,
    dataMap: e(t, "commCode", "codeKorName")
  },
  {
    header: "작업내용",
    width: "*",
    binding: "remark",
    dataType: "String",
    isReadOnly: !0
  }
];
export {
  p as createProcDtlGridColumns,
  o as createProcGridColumns,
  g as createTab2GridColumns
};
