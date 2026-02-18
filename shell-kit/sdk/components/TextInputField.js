import { j as e } from "../jsx-runtime.js";
function x({ id: t, label: r, value: n, placeholder: s, onValueChange: o }) {
  const a = (i) => {
    o(i.target.value);
  };
  return /* @__PURE__ */ e.jsxs("label", { className: "flex flex-col gap-2 text-sm text-primary ", htmlFor: t, children: [
    /* @__PURE__ */ e.jsx("span", { className: "font-medium text-primary ", children: r }),
    /* @__PURE__ */ e.jsx(
      "input",
      {
        id: t,
        type: "text",
        value: n,
        placeholder: s,
        onChange: a,
        className: "h-10 rounded-md border border-slate-200 px-3 text-sm text-primary  focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      }
    )
  ] });
}
export {
  x as default
};
