import { j as a } from "../../jsx-runtime.js";
import "react";
import { S as m } from "../../index2.js";
import { c as s } from "../../index3.js";
import { c as i } from "../../utils.js";
import { Separator as d } from "./separator.js";
function j({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: i("group/item-group flex flex-col", e),
      ...t
    }
  );
}
function I({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a.jsx(
    d,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: i("my-0", e),
      ...t
    }
  );
}
const u = s(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function N({
  className: e,
  variant: t = "default",
  size: r = "default",
  asChild: n = !1,
  ...o
}) {
  const l = n ? m : "div";
  return /* @__PURE__ */ a.jsx(
    l,
    {
      "data-slot": "item",
      "data-variant": t,
      "data-size": r,
      className: i(u({ variant: t, size: r, className: e })),
      ...o
    }
  );
}
const f = s(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function h({
  className: e,
  variant: t = "default",
  ...r
}) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": t,
      className: i(f({ variant: t, className: e })),
      ...r
    }
  );
}
function z({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-content",
      className: i(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        e
      ),
      ...t
    }
  );
}
function y({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-title",
      className: i(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        e
      ),
      ...t
    }
  );
}
function w({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "p",
    {
      "data-slot": "item-description",
      className: i(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        e
      ),
      ...t
    }
  );
}
function S({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-actions",
      className: i("flex items-center gap-2", e),
      ...t
    }
  );
}
function V({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-header",
      className: i(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function _({ className: e, ...t }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "item-footer",
      className: i(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
export {
  N as Item,
  S as ItemActions,
  z as ItemContent,
  w as ItemDescription,
  _ as ItemFooter,
  j as ItemGroup,
  V as ItemHeader,
  h as ItemMedia,
  I as ItemSeparator,
  y as ItemTitle
};
