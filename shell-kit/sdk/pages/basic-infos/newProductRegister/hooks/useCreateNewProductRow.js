import { NEW_PRODUCT_ROW_STATUS as r } from "../types.js";
const e = () => ({
  rowStatus: r.NEW,
  productCode: "",
  productName: "",
  categoryName: "",
  price: 0,
  useStatus: "Y",
  remark: ""
});
export {
  e as createNewProductRow
};
