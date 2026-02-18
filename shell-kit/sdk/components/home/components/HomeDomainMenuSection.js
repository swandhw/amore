import { j as t } from "../../../jsx-runtime.js";
import { Button as a } from "../../ui/button.js";
function c({
  domains: n,
  activeDomainId: s,
  isLoading: r,
  onDomainSelect: l
}) {
  return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
    r ? /* @__PURE__ */ t.jsx("span", { className: "text-sm text-muted-foreground", children: "불러오는 중..." }) : null,
    !r && n.length === 0 ? /* @__PURE__ */ t.jsx("span", { className: "text-sm text-muted-foreground", children: "표시할 도메인이 없습니다." }) : null,
    n.map((e) => {
      const u = e.id === s;
      return /* @__PURE__ */ t.jsx(
        a,
        {
          type: "button",
          variant: u ? "default" : "outline",
          onClick: () => l(e.id),
          children: e.name
        },
        e.id
      );
    })
  ] });
}
export {
  c as default
};
