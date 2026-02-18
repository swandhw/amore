import { useState as k, useRef as d, useCallback as c, useEffect as H } from "react";
import { Column as Q, AllowSorting as X } from "@mescius/wijmo.grid";
import { GridAdapter as Y } from "../GridAdapter.js";
import { FlexGridContextMenu as Z } from "../GridContextMenu.js";
import { useCloseGuardContext as ee, useCloseGuardTabId as te, useCloseGuard as re } from "../../../close-guard/CloseGuardHooks.js";
const b = {
  NEW: "C",
  UPDATED: "U",
  DELETED: "D"
}, ue = (T, _, x, t) => {
  const [W, q] = k([]), [R, w] = k(!1), l = d(null), o = d(new Y()), C = d(null), i = d(t.columns), S = d(
    t.onSelectionChanged
  ), M = d(
    t.onCellEditEnded
  ), P = d(
    t.onPasted
  ), p = ee(), E = te(), u = c(() => {
    w(o.current.hasChanges());
  }, []), B = c(() => o.current.hasChanges(), []);
  re({
    isDirty: t.enableCloseGuard ? R : void 0,
    hasChanges: t.enableCloseGuard ? B : void 0
  });
  const N = c(async (e) => {
    const r = await _(e);
    return r.result === "true" && r.responseBody ? (q(r.responseBody), l.current ? (o.current.init(r.responseBody), w(!1), {
      result: !0
    }) : (C.current = r.responseBody, w(!1), {
      result: !0
    })) : {
      result: !1,
      message: r.message
    };
  }, [l, o, _]), L = c(async (e) => {
    const r = () => N(e);
    return t.enableSearchGuard && R && p && E ? (p.attemptSearch(E, r), { result: !0 }) : r();
  }, [N, t.enableSearchGuard, R, p, E]), $ = c(async (e) => {
    if (!l.current) return;
    let r = e ?? T();
    const s = l.current.selectedItems?.[0];
    if (t.onBeforeCreate) {
      const a = await t.onBeforeCreate(l.current, r, s);
      if (!a.result) {
        a.message && alert(a.message);
        return;
      }
      r = a.row;
    }
    o.current.appendRow(r), u();
  }, [l, o, T, u, t.onBeforeCreate]), F = c(async () => {
    if ((l.current?.selection?.row ?? -1) < 0) return;
    const r = l.current?.selectedItems;
    if (!(!r || r.length === 0)) {
      if (t.onValidateRowDelete && l.current)
        for (const s of r) {
          const a = await t.onValidateRowDelete(l.current, s);
          if (a.result === !1) {
            alert(a.message);
            return;
          }
        }
      r.forEach((s) => {
        o.current.markDeleted(s._rowId);
      }), u();
    }
  }, [l, o, u, t.onValidateRowDelete]), I = c((e, r) => {
    e.columns.clear(), r.forEach((s) => {
      e.columns.push(new Q(s));
    });
  }, []);
  H(() => {
    i.current = t.columns, l.current && i.current && I(l.current, i.current);
  }, [I, t.columns]), H(() => {
    S.current = t.onSelectionChanged, M.current = t.onCellEditEnded, P.current = t.onPasted;
  }, [t.onSelectionChanged, t.onCellEditEnded, t.onPasted]);
  const O = c(async () => {
    const e = o.current, s = e.getCurrentRows().filter((n) => n._op !== "D"), a = new Map(e.getSnapshotRows().map((n) => [n._rowId, n])), h = new Map(s.map((n) => [n._rowId, n])), g = s.filter((n) => !a.has(n._rowId)), f = s.filter((n) => {
      const m = a.get(n._rowId);
      return m ? e.normalizeRow(n) !== e.normalizeRow(m) : !1;
    }), D = e.getSnapshotRows().filter((n) => !h.has(n._rowId)), y = [...g, ...f], J = i.current?.filter((n) => n.isRequired) ?? [];
    for (const n of y)
      for (const m of J) {
        const G = n[m.binding], K = m.dataType === "String", A = m.header ?? "필수값";
        if (K) {
          if (G == null || G === "")
            return {
              result: !1,
              message: `${A} must not be null`
            };
          continue;
        }
        if (G == null)
          return {
            result: !1,
            message: `${A} must not be null`
          };
      }
    if (t.onValidateIntegrity) {
      const n = await t.onValidateIntegrity(g, f);
      if (n && !n.result)
        return n;
    }
    const v = [
      ...g.map((n) => ({
        ...e.stripMeta(n),
        rowStatus: b.NEW
      })),
      ...f.map((n) => ({
        ...e.stripMeta(n),
        rowStatus: b.UPDATED
      })),
      ...D.map((n) => ({
        ...e.stripMeta(n),
        rowStatus: b.DELETED
      }))
    ];
    if (v.length === 0)
      return u(), {
        result: !0
      };
    const U = await x(t.gridName, v);
    return U.result === "true" ? (e.resetSnapshot(), w(!1), {
      result: !0
    }) : {
      result: !1,
      message: U.message
    };
  }, [o, x, u, t.gridName]), z = c(
    (e) => {
      const r = o.current;
      r.markUpdated(e.selectedItems[0]._rowId, (s, a) => r.normalizeRow(s) === r.normalizeRow(a)), u(), M.current?.(e);
    },
    [o, u]
  ), V = c(
    (e, r) => {
      const s = o.current, a = r.range;
      if (a?.isValid) {
        for (let h = a.topRow; h <= a.bottomRow; h += 1) {
          const f = e.rows[h]?.dataItem;
          f?._rowId && s.markUpdated(f._rowId, (D, y) => s.normalizeRow(D) === s.normalizeRow(y));
        }
        u(), P.current?.(e, r);
      }
    },
    [o, u]
  ), j = c((e) => {
    l.current = e, i.current && I(e, i.current), o.current.attach(e), C.current && (o.current.init(C.current), C.current = null, w(!1));
    const r = new Z(e, t.pageName, t.gridName);
    e.cellEditEnded.addHandler(z), e.pasted.addHandler(V), e.allowSorting = X.MultiColumn;
    const s = S.current ? () => S.current?.(e) : null;
    s && e.selectionChanged.addHandler(s);
    const a = e.dispose.bind(e);
    e.dispose = () => {
      r.dispose(), s && e.selectionChanged.removeHandler(s), a();
    };
  }, [l, o, z, V, t.pageName, t.gridName]);
  return {
    snapshotRows: W,
    isDirty: R,
    hasChanges: B,
    handleSearch: L,
    handleCreate: $,
    handleDelete: F,
    handleCommit: O,
    handleExcel: () => Promise.resolve({
      result: !0
    }),
    handleGridInitialized: j
  };
};
export {
  ue as useGrid
};
