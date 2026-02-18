import * as S from "@mescius/wijmo.grid";
import { applyHeaderLayout as y } from "./HeaderMergeManager.js";
import { getLeafNodes as p, createHeaderLayoutFromTree as L } from "./HeaderTree.js";
const A = (o, f) => {
  const { tree: a, allowDragging: h = !0 } = f, C = (e) => L(a, e), i = a.filter((e) => e.children.length > 0).map((e) => p(e).map((r) => r.binding ?? "")), w = new Set(i.flat()), B = new Set(
    a.flatMap(
      (e) => e.children.length > 0 ? p(e).map((r) => r.binding ?? "") : []
    )
  ), D = () => C(
    Array.from(o.columns).map((e) => ({
      binding: e.binding ?? "",
      header: e.header ?? ""
    }))
  ), g = () => {
    y(o, D());
  }, n = {
    isGroupDrag: !1,
    lastOverCol: null,
    groupBindings: /* @__PURE__ */ new Set(),
    isReordering: !1
  }, u = (e) => o.columns[e]?.binding ?? "", G = (e) => B.has(u(e)), H = (e) => {
    const r = u(e), s = i.findIndex((l) => l.includes(r));
    return s >= 0 ? new Set(i[s]) : null;
  }, O = (e) => {
    const r = Array.from(o.columns), s = r.filter((t) => n.groupBindings.has(t.binding ?? ""));
    if (s.length === 0) return;
    const l = r.filter((t) => !n.groupBindings.has(t.binding ?? "")), b = Math.max(0, Math.min(e, r.length - 1)), d = r.slice(0, b).filter((t) => !n.groupBindings.has(t.binding ?? "")).length, v = [
      ...l.slice(0, d),
      ...s,
      ...l.slice(d)
    ];
    n.isReordering = !0, v.forEach((t, c) => {
      const m = o.columns.indexOf(t);
      m !== c && o.columns.moveElement(m, c);
    }), n.isReordering = !1;
  };
  h && (o.allowDragging = S.AllowDragging.Columns, o.columns.forEach((e) => {
    e.allowDragging = !0;
  })), o.draggingColumn.addHandler((e, r) => {
    const s = o.columnHeaders.rows.length - 1, l = H(r.col);
    if (l && r.row >= s) {
      r.cancel = !0, n.isGroupDrag = !1, n.groupBindings = /* @__PURE__ */ new Set(), n.lastOverCol = null;
      return;
    }
    if (!l && G(r.col)) {
      r.cancel = !0, n.isGroupDrag = !1, n.groupBindings = /* @__PURE__ */ new Set(), n.lastOverCol = null;
      return;
    }
    n.isGroupDrag = !!l, n.groupBindings = l ?? /* @__PURE__ */ new Set(), n.lastOverCol = r.col;
  }), o.draggingColumnOver.addHandler((e, r) => {
    if (!n.isGroupDrag && w.has(u(r.col))) {
      r.cancel = !0;
      return;
    }
    n.lastOverCol = r.col;
  }), o.draggedColumn.addHandler(() => {
    !n.isGroupDrag || n.lastOverCol === null || (O(n.lastOverCol), g(), n.isGroupDrag = !1, n.groupBindings = /* @__PURE__ */ new Set(), n.lastOverCol = null);
  }), o.columns.collectionChanged.addHandler(() => {
    n.isReordering || g();
  }), g();
};
export {
  A as attachHeaderTreeDrag
};
