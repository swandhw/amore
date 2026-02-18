import { DataMap as r } from "@mescius/wijmo.grid";
const H = (e, t, a) => new r(e, t, a), n = {
  BIG: 48,
  HUGE: 64
}, s = (e, t) => {
  e.columnHeaders.rows.defaultSize = t;
};
export {
  n as GRID_HEADER_HEIGHT,
  H as createDataMap,
  s as setGridHeaderHeight
};
