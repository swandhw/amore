import { j as t } from "../jsx-runtime.js";
import d from "./SelectInputField.js";
import c from "./TextInputField.js";
import { buildSearchFieldValues as m } from "./search-section-utils.js";
function b({ config: s, values: l, onValuesChange: i, onSearch: n }) {
  const a = (e, r) => {
    i({
      ...l,
      [e]: r
    });
  }, o = () => {
    const e = m(s, l);
    n?.(e);
  };
  return /* @__PURE__ */ t.jsxs("section", { className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", children: [
    /* @__PURE__ */ t.jsxs("header", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-lg font-semibold text-primary ", children: s.title }),
      s.description ? /* @__PURE__ */ t.jsx("p", { className: "text-sm text-primary ", children: s.description }) : null
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: s.fields.map((e) => e.type === "select" ? /* @__PURE__ */ t.jsx(
      d,
      {
        id: e.id,
        label: e.label,
        value: l[e.id] ?? "",
        options: e.options ?? [],
        placeholder: e.placeholder,
        onValueChange: (r) => a(e.id, r)
      },
      e.id
    ) : /* @__PURE__ */ t.jsx(
      c,
      {
        id: e.id,
        label: e.label,
        value: l[e.id] ?? "",
        placeholder: e.placeholder,
        onValueChange: (r) => a(e.id, r)
      },
      e.id
    )) }),
    /* @__PURE__ */ t.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ t.jsx(
      "button",
      {
        type: "button",
        onClick: o,
        className: "inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500",
        children: "검색"
      }
    ) })
  ] });
}
export {
  b as default
};
