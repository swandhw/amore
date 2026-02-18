import { DataMap as a } from "@mescius/wijmo.grid";
import { CATEGORY_DATASET as e, USE_STATUS_DATASET as d } from "./hooks/useNewProductFilterDataset.js";
const r = [
  {
    header: "제품코드",
    width: "*",
    binding: "productCode",
    dataType: "String"
  },
  {
    header: "제품명",
    width: "*",
    binding: "productName",
    dataType: "String"
  },
  {
    header: "카테고리",
    width: "*",
    binding: "categoryName",
    dataType: "String",
    dataMap: new a(e, "code", "name")
  },
  {
    header: "가격",
    width: "*",
    binding: "price",
    dataType: "Number",
    format: "n0",
    align: "right"
  },
  {
    header: "사용유무",
    width: "*",
    binding: "useStatus",
    dataType: "String",
    dataMap: new a(d, "code", "name")
  },
  {
    header: "비고",
    width: "*",
    binding: "remark",
    dataType: "String"
  }
];
export {
  r as NEW_PRODUCT_HEADER_DEFINITION
};
