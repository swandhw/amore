import { j as l } from "../../../jsx-runtime.js";
import { Button as c } from "../../ui/button.js";
import { Accordion as s, AccordionItem as a, AccordionTrigger as d, AccordionContent as x } from "../../ui/accordion.js";
function u({
  menus: t,
  activeMenuId: r,
  isLoading: o,
  onMenuSelect: n
}) {
  return /* @__PURE__ */ l.jsx("div", { className: "flex h-full min-h-0 flex-col", children: /* @__PURE__ */ l.jsxs("nav", { className: "flex-1 min-h-0 space-y-2 overflow-auto px-3 py-4", children: [
    o ? /* @__PURE__ */ l.jsx("p", { className: "text-muted-foreground", children: "불러오는 중..." }) : null,
    !o && t.length === 0 ? /* @__PURE__ */ l.jsx("p", { className: "text-muted-foreground", children: "열람 가능한 메뉴가 없습니다." }) : null,
    /* @__PURE__ */ l.jsx(
      s,
      {
        type: "single",
        collapsible: !0,
        children: t.map((e) => {
          const i = r === e.id;
          return /* @__PURE__ */ l.jsxs(a, { value: e.label, children: [
            /* @__PURE__ */ l.jsx(d, { children: e.label }),
            /* @__PURE__ */ l.jsx(x, { children: /* @__PURE__ */ l.jsx(
              c,
              {
                type: "button",
                variant: i ? "default" : "outline",
                onClick: () => n(e),
                className: `font-semibold w-full ${i ? "leading-tight" : ""}`,
                children: e.label
              },
              e.id
            ) })
          ] }, e.id);
        })
      }
    )
  ] }) });
}
export {
  u as default
};
