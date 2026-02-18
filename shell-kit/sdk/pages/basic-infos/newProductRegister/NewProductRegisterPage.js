import { j as l } from "../../../jsx-runtime.js";
import { useEffect as p, useCallback as f } from "react";
import E from "./NewProductRegisterView.js";
import { NEW_PRODUCT_HEADER_DEFINITION as h } from "./headerDefinition.js";
import { USE_STATUS_DATASET as C, CATEGORY_DATASET as A } from "./hooks/useNewProductFilterDataset.js";
import { useGrid as G } from "../../../components/ap-wijmo/grid/hooks/useGrid.js";
import { createNewProductRow as N } from "./hooks/useCreateNewProductRow.js";
import { saveNewProductRegisters as P, fetchNewProductRegisters as R } from "./api/newProductRegisterApi.js";
import { useI18N as g } from "../../../i18n/useI18N.js";
import { usePageCrudAuth as I } from "../../../hooks/usePageCrudAuthCheck.js";
import { setGridHeaderHeight as D, GRID_HEADER_HEIGHT as T } from "../../../components/ap-wijmo/grid/Util.js";
const r = "newProductRegister";
function b() {
  const a = g(), i = I(r), {
    handleSearch: e,
    handleCreate: m,
    handleDelete: n,
    handleCommit: s,
    handleExcel: d,
    handleGridInitialized: t
  } = G(
    N,
    R,
    P,
    {
      pageName: r,
      gridName: "mainGrid",
      columns: h
    }
  );
  p(() => {
    e();
  }, [e]);
  const c = f((o) => {
    t(o), D(o, T.BIG);
  }, [t]), u = {
    title: a.t("표준 공정 등록"),
    can: i.can,
    actions: {
      createCommand: m,
      deleteCommand: n,
      searchCommand: e,
      commitCommand: s,
      excelCommand: d
    }
  };
  return /* @__PURE__ */ l.jsx(
    E,
    {
      categoryDataset: A,
      useStatusDataset: C,
      commonButtonsProps: u,
      onGridInitialized: c
    }
  );
}
export {
  b as default
};
