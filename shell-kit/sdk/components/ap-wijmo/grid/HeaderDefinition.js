const d = (o, r) => ({
  rows: r,
  cols: o.length,
  cells: o.map((e, a) => ({
    row: 0,
    col: a,
    rowspan: r,
    colspan: 1,
    label: e
  }))
}), c = (o, r, e) => {
  const a = o.row + o.rowspan - 1, t = o.col + o.colspan - 1;
  return r >= o.row && r <= a && e >= o.col && e <= t;
}, u = (o, r, e) => {
  const a = o.map((n, s) => ({
    row: 0,
    col: s,
    rowspan: r,
    colspan: 1,
    label: n
  })), t = e.map((n) => ({
    row: n.row ?? 0,
    col: n.col,
    rowspan: n.rowspan ?? 1,
    colspan: n.colspan ?? 1,
    label: n.label
  })), p = a.filter((n) => {
    for (let s = 0; s < r; s += 1)
      if (c(n, s, n.col) && t.some((l) => c(l, s, n.col)))
        return !1;
    return !0;
  });
  return {
    rows: r,
    cols: o.length,
    cells: [...p, ...t]
  };
}, w = (o, r, e) => {
  const a = o.map((t) => t.header);
  return {
    columns: o,
    headerLayout: u(a, r, e)
  };
};
export {
  u as createHeaderLayoutFromNexacro,
  w as createNexacroGridConfig,
  d as createUniformHeaderLayout
};
