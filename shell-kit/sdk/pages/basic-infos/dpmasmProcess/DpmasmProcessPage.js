import { j as P } from "../../../jsx-runtime.js";
import { useState as r, useMemo as m, useCallback as i, useEffect as f } from "react";
import le from "../../../components/ap-wijmo/search/SearchConditionFields.js";
import { useGrid as y } from "../../../components/ap-wijmo/grid/hooks/useGrid.js";
import { useCloseGuardContext as ue, useCloseGuardTabId as me } from "../../../components/close-guard/CloseGuardHooks.js";
import pe from "./DpmasmProcessView.js";
import { fetchDsProcCdOptions as he, fetchDsPlantOptions as Ce, fetchDsPrdCiOptions as Pe, fetchDsProcTypeOptions as fe, fetchDsCudCiOptions as Ge, saveProcDtlRows as De, fetchProcDtlRows as Te, fetchTab2Rows as Se, saveProcRows as be, fetchProcRows as ge } from "./api/dpmasmProcessApi.js";
import { createProcGridColumns as ye, createProcDtlGridColumns as Oe, createTab2GridColumns as ve } from "./hooks/useCreateGridColumns.js";
import { createProcDtlRow as Ee, createTab2Row as we, createProcRow as Ie } from "./hooks/useCreateRows.js";
import { useI18N as Re } from "../../../i18n/useI18N.js";
import { usePageCrudAuth as xe } from "../../../hooks/usePageCrudAuthCheck.js";
const O = "register", Ae = "status", G = "DPMASM_PROCESS_PAGE", v = (p, D) => {
  const o = p[D];
  return typeof o == "string" ? o : null;
};
function ke() {
  const p = Re(), D = xe(G), [o, j] = r(O), [E, w] = r("proc"), [l, K] = r({
    prdCi: "SC",
    procCode: null,
    cudCi: null
  }), [T, M] = r(null), [S, _] = r(null), [d, L] = r([]), [a, q] = r([]), [h, k] = r([]), [s, H] = r([]), [u, W] = r([]), U = m(
    () => ye({
      dsPlantOptions: d,
      dsPrdCiOptions: a,
      dsCudCiOptions: s
    }),
    [d, a, s]
  ), J = m(
    () => Oe({
      dsPlantOptions: d,
      dsPrdCiOptions: a,
      dsProcCdOptions: u,
      dsProcTypeOptions: h,
      dsCudCiOptions: s
    }),
    [
      d,
      a,
      u,
      h,
      s
    ]
  ), Q = m(
    () => ve({
      dsPlantOptions: d,
      dsPrdCiOptions: a,
      dsProcTypeOptions: h
    }),
    [d, a, h]
  ), {
    handleSearch: C,
    handleCreate: I,
    handleCommit: R,
    handleDelete: X,
    handleGridInitialized: x
  } = y(
    Ee,
    Te,
    De,
    {
      pageName: G,
      gridName: "procDtlGrid",
      columns: J,
      enableCloseGuard: !0
    }
  ), n = m(() => ({
    prdCi: v(l, "prdCi"),
    procCode: v(l, "procCode"),
    cudCi: v(l, "cudCi")
  }), [l]), Y = i((e) => {
    const t = e.selectedItems?.[0];
    t && C({
      plant: t.plant,
      prdCi: t.prdCi,
      procCode: t.procCode,
      cudCi: n.cudCi
    });
  }, [C, n.cudCi]), {
    handleSearch: A,
    handleCreate: N,
    handleCommit: B,
    handleGridInitialized: z,
    handleExcel: Z
  } = y(
    Ie,
    ge,
    be,
    {
      pageName: G,
      gridName: "procGrid",
      columns: U,
      onSelectionChanged: Y,
      enableCloseGuard: !0
    }
  ), {
    handleSearch: F,
    handleGridInitialized: $
  } = y(
    we,
    Se,
    async () => ({ result: "true", message: "noop" }),
    {
      pageName: G,
      gridName: "tab2Grid",
      columns: Q,
      enableCloseGuard: !0
    }
  ), b = ue(), g = me(), ee = m(
    () => [
      {
        id: "prdCi",
        label: "제품구분",
        type: "combo",
        dataSource: a,
        dataPathToText: "codeKorNameRe",
        dataPathToValue: "commCode",
        required: !1,
        defaultValue: "MK"
      },
      {
        id: "procCode",
        label: "대공정",
        type: "combo",
        dataSource: u,
        dataPathToText: "procName",
        dataPathToValue: "procCode",
        required: !1,
        defaultValue: null
      },
      {
        id: "cudCi",
        label: "사용유무",
        type: "combo",
        dataSource: s,
        dataPathToText: "codeKorName",
        dataPathToValue: "commCode",
        required: !1,
        defaultValue: null
      }
    ],
    [a, u, s]
  ), V = i(async () => o === Ae ? F(n) : (await A(n), n.procCode && await C(n), {
    result: !0
  }), [o, n, A, C, F]), te = i(() => {
    const e = () => V();
    return !b || !g ? e() : (b.attemptSearch(g, e), Promise.resolve({ result: !0 }));
  }, [b, g, V]), oe = i(() => {
    if (o === O) {
      if (E === "proc") {
        N();
        return;
      }
      I();
    }
  }, [E, o, N, I]), re = i(async () => o !== O ? {
    result: !0
  } : (await B(), await R(), {
    result: !0
  }), [o, B, R]), ae = i(
    (e) => {
      z(e), M(e);
    },
    [z]
  ), ne = i(
    (e) => {
      x(e), _(e);
    },
    [x]
  );
  f(() => {
    if (!T) return;
    const t = T.hostElement, c = () => w("proc");
    return t.addEventListener("focusin", c), () => {
      t.removeEventListener("focusin", c);
    };
  }, [T]), f(() => {
    if (!S) return;
    const t = S.hostElement, c = () => w("procDtl");
    return t.addEventListener("focusin", c), () => {
      t.removeEventListener("focusin", c);
    };
  }, [S]), f(() => {
    (async () => {
      const [t, c, ie, de] = await Promise.all([
        Ce(),
        Pe(),
        fe(),
        Ge()
      ]);
      L(t.responseBody || []), q(c.responseBody || []), k(ie.responseBody || []), H(de.responseBody || []);
    })();
  }, []);
  const se = a.length > 0 && u.length > 0 && s.length > 0;
  f(() => {
    const e = n.prdCi;
    he({ prdCi: e }).then((t) => {
      t.responseBody && W(t.responseBody);
    });
  }, [n.prdCi]);
  const ce = {
    title: p.t("표준 공정 등록"),
    can: D.can,
    actions: {
      createCommand: oe,
      deleteCommand: X,
      searchCommand: te,
      commitCommand: re,
      excelCommand: Z
    }
  };
  return /* @__PURE__ */ P.jsx(
    pe,
    {
      activeTab: o,
      onTabChange: j,
      searchSection: se ? /* @__PURE__ */ P.jsx(
        le,
        {
          fields: ee,
          values: l,
          onValuesChange: K
        }
      ) : /* @__PURE__ */ P.jsx(P.Fragment, { children: "로딩중..." }),
      t: p.t,
      commonButtonsProps: ce,
      onProcGridInitialized: ae,
      onProcDtlGridInitialized: ne,
      onTab2GridInitialized: $
    }
  );
}
export {
  ke as default
};
