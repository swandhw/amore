import { useEffect as f } from "react";
import { Menu as p } from "@mescius/wijmo.input";
import { GroupRow as g, CellRange as C, ClipStringOptions as T, AllowSorting as E } from "@mescius/wijmo.grid";
import { CollectionViewGroup as N, PropertyGroupDescription as d, saveFile as R, SortDescription as x, DataType as A } from "@mescius/wijmo";
import { FlexGridXlsxConverter as L } from "@mescius/wijmo.grid.xlsx";
import { t as m } from "../../../index.js";
const k = (u, e, t) => {
  f(() => {
    if (!u) return;
    const c = new w(u, e, t);
    return () => {
      c.dispose();
    };
  }, [u, e, t]);
};
class w {
  _grid;
  _menu;
  _contextMenuHandler;
  _pageName;
  _gridName;
  _initialColumnLayout;
  constructor(e, t, c) {
    this._grid = e, this._pageName = t, this._gridName = c, this._initialColumnLayout = e.columnLayout, this._contextMenuHandler = (n) => this._handleContextMenu(n), this._grid.hostElement.addEventListener("contextmenu", this._contextMenuHandler, !0), this._menu = this._buildMenu(e);
  }
  dispose() {
    this._grid.hostElement.removeEventListener("contextmenu", this._contextMenuHandler, !0), this._menu && this._menu.dispose();
  }
  _handleContextMenu(e) {
    const t = this._grid, c = t.selection, n = t.hitTest(e), i = n.getRow();
    switch (n.panel) {
      case t.cells: {
        let s = n.col;
        if (i instanceof g && i.dataItem instanceof N) {
          const o = i.dataItem.groupDescription;
          if (o instanceof d) {
            const a = t.getColumn(o.propertyName);
            a && a.index > -1 && (s = a.index);
          }
        }
        t.select(n.row, s);
        break;
      }
      case t.columnHeaders:
        t.select(c.row, n.col);
        break;
      case t.rowHeaders:
        t.select(n.row, c.col);
        break;
      default:
        return;
    }
    t.selection.col > -1 && (e.preventDefault(), this._menu.show(e));
  }
  _getStorageKey() {
    return !this._pageName || !this._gridName ? null : `${this._pageName}_${this._gridName}`;
  }
  _saveSettings() {
    const e = this._getStorageKey();
    if (!e) return;
    const t = this._grid.columnLayout;
    t && (localStorage.setItem(e, t), m.success("설정이 저장되었습니다."));
  }
  _loadSettings() {
    const e = this._getStorageKey();
    if (!e) return;
    const t = localStorage.getItem(e);
    t ? (this._grid.columnLayout = t, m.success("설정을 불러왔습니다.")) : m.error("저장된 설정이 없습니다.");
  }
  _resetSettings() {
    const e = this._getStorageKey();
    e && (localStorage.removeItem(e), this._grid.columnLayout = this._initialColumnLayout, m.success("설정이 초기화되었습니다."));
  }
  _buildMenu(e) {
    const t = [
      {
        header: "Sort",
        items: [
          { header: "Ascending", cmd: "SRT_ASC" },
          { header: "Descending", cmd: "SRT_DESC" },
          { header: "No Sort", cmd: "SRT_NONE" },
          { header: "-" },
          { header: "Clear All Sorts", cmd: "SRT_CLR" }
        ]
      },
      { header: "-" },
      { header: "Pin/Unpin", cmd: "PIN" },
      { header: "-" },
      { header: "AutoSize", cmd: "ASZ" },
      { header: "AutoSize All", cmd: "ASZ_ALL" },
      { header: "-" },
      { header: "Group/Ungroup", cmd: "GRP" },
      { header: "Clear All Groups", cmd: "GRP_CLR" },
      { header: "-" },
      {
        header: "Export",
        items: [
          { header: "CSV", cmd: "X_CSV" },
          { header: "XLSX", cmd: "X_XLSX" }
          // { header: 'PDF', cmd: 'X_PDF' },
        ]
      }
    ];
    return this._pageName && this._gridName && t.unshift(
      { header: "설정 저장", cmd: "SAVE_SETTINGS" },
      { header: "설정 불러오기", cmd: "LOAD_SETTINGS" },
      { header: "설정 초기화", cmd: "RESET_SETTINGS" },
      { header: "-" }
    ), new p(document.createElement("div"), {
      owner: e.hostElement,
      displayMemberPath: "header",
      subItemsPath: "items",
      commandParameterPath: "cmd",
      dropDownCssClass: "ctx-menu",
      openOnHover: !0,
      closeOnLeave: !0,
      itemsSource: t,
      command: {
        // enable/disable menu commands
        canExecuteCommand: (n) => {
          if (n === "SAVE_SETTINGS" || n === "LOAD_SETTINGS" || n === "RESET_SETTINGS") return !0;
          const i = e.collectionView;
          if (!i || !e.columns) return !1;
          const s = e.columns[e.selection.col];
          if (!s) return !1;
          switch (n) {
            case "SRT_ASC":
              return s.currentSort !== "+";
            case "SRT_DESC":
              return s.currentSort !== "-";
            case "SRT_NONE":
              return s.currentSort != null;
            case "SRT_CLR":
              return i.sortDescriptions.length > 0;
            case "PIN":
              return !0;
            // toggle pin
            case "ASZ":
            case "ASZ_ALL":
              return !0;
            case "GRP":
              return s.dataType !== A.Number;
            // don't group numbers
            case "GRP_CLR":
              return i.groupDescriptions.length > 0;
          }
          return !0;
        },
        // execute menu commands
        executeCommand: (n) => {
          if (n === "SAVE_SETTINGS") {
            this._saveSettings();
            return;
          }
          if (n === "LOAD_SETTINGS") {
            this._loadSettings();
            return;
          }
          if (n === "RESET_SETTINGS") {
            this._resetSettings();
            return;
          }
          const i = e.collectionView, s = e.columns, o = s[e.selection.col], a = i.sortDescriptions, l = i.groupDescriptions;
          switch (n) {
            case "SRT_ASC":
            case "SRT_DESC":
            case "SRT_NONE":
              if (e.allowSorting !== E.MultiColumn)
                a.clear();
              else
                for (let r = 0; r < a.length; r++)
                  if (a[r].property === o.binding) {
                    a.removeAt(r);
                    break;
                  }
              n !== "SRT_NONE" && o.binding && a.push(new x(o.binding, n === "SRT_ASC"));
              break;
            case "SRT_CLR":
              a.clear();
              break;
            case "PIN": {
              const r = e.frozenColumns;
              o.index >= r ? (s.moveElement(o.index, r, !1), s.frozen++) : (s.moveElement(o.index, r - 1, !1), s.frozen--);
              break;
            }
            case "ASZ":
              e.autoSizeColumn(o.index);
              break;
            case "ASZ_ALL":
              e.autoSizeColumns(0, e.columns.length - 1);
              break;
            case "GRP": {
              if (!o.binding) return;
              for (let r = 0; r < l.length; r++)
                if (l[r].propertyName === o.binding) {
                  l.removeAt(r);
                  return;
                }
              l.push(new d(o.binding));
              break;
            }
            case "GRP_CLR":
              l.clear();
              break;
            // export
            case "X_CSV": {
              const r = new C(0, 0, e.rows.length - 1, e.columns.length - 1), _ = e.getClipString(r, T.CSV, !0, !1);
              R(_, "FlexGrid.csv");
              break;
            }
            case "X_XLSX":
              L.saveAsync(e, { includeColumnHeaders: !0 }, "FlexGrid.xlsx");
              break;
          }
          e.refresh();
          const S = e.selection, h = e.cells.getCellElement(S.row, S.col);
          h && h.focus();
        }
      }
    });
  }
}
export {
  w as FlexGridContextMenu,
  k as useGridContextMenu
};
