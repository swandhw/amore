import { j as l } from "../jsx-runtime.js";
function u({
  id: r,
  label: t,
  value: a,
  options: s,
  placeholder: n = "선택하세요",
  onValueChange: o
}) {
  const i = (e) => {
    o(e.target.value);
  };
  return /* @__PURE__ */ l.jsxs("label", { className: "flex flex-col gap-2 text-sm text-primary ", htmlFor: r, children: [
    /* @__PURE__ */ l.jsx("span", { className: "font-medium text-primary ", children: t }),
    /* @__PURE__ */ l.jsxs(
      "select",
      {
        id: r,
        value: a,
        onChange: i,
        className: "h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-primary  focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100",
        children: [
          /* @__PURE__ */ l.jsx("option", { value: "", disabled: !0, children: n }),
          s.map((e) => /* @__PURE__ */ l.jsx("option", { value: e.value, children: e.label }, e.value))
        ]
      }
    )
  ] });
}
export {
  u as default
};
