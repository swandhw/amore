import { j as f } from "../../../jsx-runtime.js";
import { useState as l, useMemo as p, useEffect as L, useCallback as u } from "react";
import { useGrid as M } from "../../../components/ap-wijmo/grid/hooks/useGrid.js";
import F from "./BadCodeRegisterView.js";
import j from "../../../components/ap-wijmo/search/SearchConditionFields.js";
import { attachHeaderTreeDrag as k } from "../../../components/ap-wijmo/grid/HeaderTreeDrag.js";
import { fetchDsSearchListResult535Row as z, fetchDsSearchListResult14Row as O, fetchDsCombo1 as q, saveBadCodeRegisters as v, fetchBadCodeRegisters as H } from "./api/badCodeRegisterApi.js";
import { createBadCodeRow as K } from "./hooks/useCreateBadCodRow.js";
import { createDatagrid1ColumnDefinition as $, BAD_CODE_HEADER_TREE as U } from "./hooks/useCreateGridColumn.js";
import { useI18N as W } from "../../../i18n/useI18N.js";
import { usePageCrudAuth as Y } from "../../../hooks/usePageCrudAuthCheck.js";
const R = "DPMASM_BAD_CODE_REGISTER_PAGE";
function ne() {
  const S = W(), g = Y(R), [m, y] = l([]), [d, D] = l([]), [n, b] = l([]), [r, E] = l({
    codeType: "0002",
    useStatus: "N"
    // prdName: 'AMORE SKIN',
  }), B = p(
    () => [
      {
        id: "codeType",
        label: "코드타입",
        type: "combo",
        dataSource: n,
        dataPathToText: "codeKorNameRe",
        dataPathToValue: "commCode",
        required: !1,
        defaultValue: "0001"
      },
      {
        id: "useStatus",
        label: "사용유무",
        type: "combo",
        dataSource: d,
        dataPathToText: "codeKorName",
        dataPathToValue: "commCode",
        required: !1,
        defaultValue: "N"
      },
      {
        id: "prdName",
        label: "제품명",
        type: "text",
        required: !1,
        defaultValue: "미백잔치"
      }
    ],
    [n, d]
  );
  L(() => {
    (async () => {
      const [a, o, s] = await Promise.all([
        z(),
        O(),
        q()
      ]), t = a.responseBody || [], i = o.responseBody || [], c = s.responseBody || [];
      y(t), D(i), b(c);
    })();
  }, []);
  const T = n.length > 0 && d.length > 0, w = p(() => $({
    dsSearchListResult535Row: m,
    dsSearchlistresult14Row: d,
    dsCombo1: n
  }), [m, d, n]), _ = u((e, a) => {
    const o = /* @__PURE__ */ new Set();
    for (const s of [...e, ...a]) {
      const t = s.badCodeCategory ?? "", i = s.badCode ?? "";
      if (!t || !i) continue;
      const c = `${t}::${i}`;
      if (o.has(c))
        return {
          result: !1,
          message: "불량코드구분/불량코드 조합이 중복되었습니다."
        };
      o.add(c);
    }
    return {
      result: !0
    };
  }, []), {
    handleSearch: h,
    handleCreate: G,
    handleDelete: P,
    handleCommit: x,
    handleExcel: A,
    handleGridInitialized: C
  } = M(
    K,
    H,
    v,
    {
      columns: w,
      pageName: R,
      gridName: "mainGrid",
      onValidateRowDelete: (e, a) => a.useStatus === "Y" ? {
        result: !1,
        message: "사용중인 코드는 삭제할 수 없습니다."
      } : {
        result: !0
      },
      onValidateIntegrity: _,
      onBeforeCreate: (e, a, o) => {
        const s = [
          "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를 — 윤동주",
          "나 보기가 역겨워 가실 때에는 — 김소월",
          "별 하나에 추억과 별 하나에 사랑과 — 윤동주",
          "한 송이의 국화꽃을 피우기 위해 — 서정주",
          "나는 한 줄기 바람이 되어 — 김영랑",
          "꽃이 진다고 그대를 잊은 적 없다 — 이형기",
          "푸른 하늘의 햇빛은 나의 하늘의 빛 — 이육사",
          "사뿐히 즈려밟고 가시옵소서 — 김소월",
          "한줄기 바람이 머물다간 — 김영랑"
        ], t = { ...a };
        return o && (t.badCodeCategory = o.badCodeCategory), t.remark = s[Math.floor(Math.random() * s.length)], {
          result: !0,
          row: t
        };
      },
      enableCloseGuard: !0,
      enableSearchGuard: !0
    }
  ), N = u(() => {
    const e = {
      codeType: typeof r.codeType == "string" ? r.codeType : null,
      useStatus: typeof r.useStatus == "string" ? r.useStatus : null
    };
    return h(e);
  }, [h, r]), I = u((e) => {
    C(e), k(e, {
      tree: U
    });
  }, [C]), V = {
    title: S.t("불량코드등록"),
    can: g.can,
    actions: {
      createCommand: G,
      deleteCommand: P,
      searchCommand: N,
      commitCommand: x,
      excelCommand: A
    }
  };
  return /* @__PURE__ */ f.jsx(
    F,
    {
      searchSection: T ? /* @__PURE__ */ f.jsx(
        j,
        {
          fields: B,
          values: r,
          onValuesChange: E
        }
      ) : "로딩중...",
      commonButtonsProps: V,
      onGridInitialized: I
    }
  );
}
export {
  ne as default
};
