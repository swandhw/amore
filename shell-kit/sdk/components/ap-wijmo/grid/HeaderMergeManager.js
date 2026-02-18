import * as a from "@mescius/wijmo.grid";
class w extends a.MergeManager {
  _ranges = [];
  constructor(l, e) {
    super(), this._ranges = e.cells.map(
      (r) => (
        // 넥사크로 스타일(rowspan/colspan)을 Wijmo 좌표로 변환
        new a.CellRange(r.row, r.col, r.row + r.rowspan - 1, r.col + r.colspan - 1)
      )
    );
  }
  getMergedRange(l, e, r, n = !0) {
    if (l.cellType === a.CellType.ColumnHeader) {
      const s = this._ranges.find((t) => t.contains(e, r));
      if (s) return s;
    }
    return super.getMergedRange(l, e, r, n);
  }
}
const g = (o, l) => {
  o && o.deferUpdate(() => {
    for (o.allowMerging = a.AllowMerging.ColumnHeaders, o.columns.forEach((e) => {
      e.allowMerging = !0;
    }); o.columnHeaders.rows.length < l.rows; )
      o.columnHeaders.rows.push(new a.Row());
    l.cells.forEach((e) => {
      for (let r = e.row; r < e.row + e.rowspan; r++)
        for (let n = e.col; n < e.col + e.colspan; n++)
          o.columnHeaders.setCellData(r, n, e.label);
    }), o.mergeManager = new w(o, l);
  });
};
export {
  g as applyHeaderLayout
};
