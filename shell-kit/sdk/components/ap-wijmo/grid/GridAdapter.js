import "@mescius/wijmo.grid";
function a(d) {
  return {
    ...d,
    _rowId: crypto.randomUUID(),
    _dirty: !1,
    _op: void 0
  };
}
class c {
  grid;
  rows = [];
  snapshot = /* @__PURE__ */ new Map();
  attach(r) {
    this.grid = r, this.grid.beginningEdit.addHandler((t, e) => {
      e.getRow().dataItem._op === "D" && (e.cancel = !0);
    }), this.grid.autoGenerateColumns = !1, this.grid.rowHeaders.columns.length > 0 && (this.grid.rowHeaders.columns[0].width = 42), this.grid.formatItem.addHandler((t, e) => {
      if (e.panel !== t.rowHeaders || e.row < 0) return;
      const n = t.rows[e.row]?.dataItem?._op, s = e.cell;
      if (s.classList.remove("text-emerald-600", "text-amber-600", "text-rose-600", "font-semibold"), n === "C") {
        s.textContent = "C", s.classList.add("text-emerald-600", "font-semibold");
        return;
      }
      if (n === "U") {
        s.textContent = "U", s.classList.add("text-amber-600", "font-semibold");
        return;
      }
      if (n === "D") {
        s.textContent = "D", s.classList.add("text-rose-600", "font-semibold");
        return;
      }
      s.textContent = String(e.row + 1);
    });
  }
  init(r) {
    this.snapshot.clear(), this.rows = r.map((t) => a(structuredClone(t))), this.rows.forEach((t) => {
      this.snapshot.set(t._rowId, structuredClone(t));
    }), this.grid.itemsSource = this.rows;
  }
  getCurrentRows() {
    return this.grid?.itemsSource ?? [];
  }
  getSnapshotRows() {
    return Array.from(this.snapshot.values());
  }
  appendRow(r) {
    const t = a(structuredClone(r));
    t._op = "C";
    const e = [...this.getCurrentRows(), t];
    this.grid.itemsSource = e, this.rows = e, this.grid.collectionView?.refresh();
  }
  markUpdated(r, t) {
    const o = this.getCurrentRows().find((n) => n._rowId === r);
    if (!o || o._op === "C" || o._op === "D") return;
    const i = this.snapshot.get(o._rowId);
    if (!i) {
      o._op = "C";
      return;
    }
    if (t && t(o, i)) {
      o._op = void 0;
      return;
    }
    o._op = "U", this.grid.collectionView?.refresh();
  }
  stripMeta(r, t = []) {
    const e = { ...r };
    return delete e._rowId, delete e._op, delete e._dirty, t.forEach((o) => {
      delete e[o];
    }), e;
  }
  normalizeRow(r, t = []) {
    return JSON.stringify(this.stripMeta(r, t));
  }
  markDeleted(r) {
    const t = this.getCurrentRows(), e = t.find((o) => o._rowId === r);
    if (e) {
      if (e._op === "C") {
        const o = t.filter((i) => i._rowId !== r);
        this.grid.itemsSource = o, this.rows = o, this.grid.collectionView?.refresh();
        return;
      }
      if (e._op === "D") {
        const o = t.indexOf(e);
        t[o] = this.getSnapshotRows().filter((i) => i._rowId === e._rowId)[0], e._op = void 0;
      } else
        e._op = "D";
      this.grid.collectionView?.refresh();
    }
  }
  resetSnapshot() {
    const r = this.getCurrentRows().filter((t) => t._op !== "D");
    r.forEach((t) => {
      t._op = void 0, t._dirty = !1;
    }), this.snapshot.clear(), r.forEach((t) => {
      this.snapshot.set(t._rowId, structuredClone(t));
    }), this.grid.itemsSource = r, this.rows = r;
  }
  hasChanges() {
    return this.getCurrentRows().some((r) => r._op);
  }
}
export {
  c as GridAdapter
};
