import { createLeafNode as e, createGroupNode as i } from "../../../../components/ap-wijmo/grid/HeaderTree.js";
import { createDataMap as a } from "../../../../components/ap-wijmo/grid/Util.js";
const g = ({
  dsSearchListResult535Row: d,
  dsSearchlistresult14Row: t,
  dsCombo1: r
}) => [
  {
    header: "제품구분",
    width: "*",
    binding: "productCategory",
    dataType: "String",
    align: "center",
    isRequired: !0,
    dataMap: a(d, "commCode", "codeKorName")
  },
  {
    header: "불량코드구분",
    width: "*",
    binding: "badCodeCategory",
    dataType: "String",
    dataMap: a(r, "commCode", "codeKorNameRe"),
    align: "left",
    isRequired: !0
  },
  {
    header: "불량코드",
    width: "*",
    binding: "badCode",
    dataType: "String",
    align: "left",
    isRequired: !0
  },
  {
    header: "불량코드명",
    width: "*",
    binding: "badCodeName",
    dataType: "String",
    align: "right"
  },
  {
    header: "사용유무",
    width: "*",
    binding: "useStatus",
    dataType: "String",
    dataMap: a(t, "commCode", "codeKorName"),
    align: "right"
  },
  {
    header: "비고",
    width: "*",
    binding: "remark",
    dataType: "String",
    align: "center"
  }
], C = [
  e("productCategory", "제품구분", "productCategory"),
  i("badCodeGroup", "불량코드", [
    e("badCodeCategory", "불량코드구분", "badCodeCategory"),
    e("badCode", "불량코드", "badCode"),
    e("badCodeName", "불량코드명", "badCodeName")
  ]),
  e("useStatus", "사용유무", "useStatus"),
  e("remark", "비고", "remark")
];
export {
  C as BAD_CODE_HEADER_TREE,
  g as createDatagrid1ColumnDefinition
};
