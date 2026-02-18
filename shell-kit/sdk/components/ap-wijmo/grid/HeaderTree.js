const b = (e) => {
  const n = (t) => t.children.length === 0 ? 1 : 1 + Math.max(...t.children.map(n));
  return e.length === 0 ? 0 : Math.max(...e.map(n));
}, h = (e) => e.children.length === 0 ? [e] : e.children.flatMap(h), M = (e) => h(e).length, w = (e, n, t) => e.children.length > 0 ? 1 : n - t, C = (e, n) => {
  const t = b(e), o = new Map(n.map((a, c) => [a.binding, c])), s = n.map((a) => a.header), f = e.flatMap((a) => {
    const c = (r, i) => {
      const p = h(r).map((l) => o.get(l.binding ?? "")).filter((l) => typeof l == "number");
      if (p.length === 0) return [];
      const u = Math.min(...p), d = M(r), m = w(r, t, i), g = {
        row: i,
        col: u,
        rowspan: m,
        colspan: d,
        label: r.title
      };
      return r.children.length === 0 ? [g] : [g, ...r.children.flatMap((l) => c(l, i + 1))];
    };
    return c(a, 0);
  });
  return {
    rows: t,
    cols: s.length,
    cells: f
  };
}, D = (e, n, t) => ({
  id: e,
  title: n,
  binding: t,
  children: []
}), L = (e, n, t) => {
  const o = {
    id: e,
    title: n,
    children: t
  };
  return t.forEach((s) => {
    s.parent = o;
  }), o;
};
export {
  L as createGroupNode,
  C as createHeaderLayoutFromTree,
  D as createLeafNode,
  M as getColSpan,
  h as getLeafNodes,
  w as getRowSpan,
  b as getTreeDepth
};
