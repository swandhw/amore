import { j as a } from "../../jsx-runtime.js";
import { useMemo as f } from "react";
import { c as u } from "../../index3.js";
import { c as l } from "../../utils.js";
import { Label as c } from "./label.js";
import { Separator as m } from "./separator.js";
function w({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx(
    "fieldset",
    {
      "data-slot": "field-set",
      className: l(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        t
      ),
      ...e
    }
  );
}
function N({
  className: t,
  variant: e = "legend",
  ...o
}) {
  return /* @__PURE__ */ a.jsx(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": e,
      className: l(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        t
      ),
      ...o
    }
  );
}
function k({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: l(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        t
      ),
      ...e
    }
  );
}
const p = u(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function F({
  className: t,
  orientation: e = "vertical",
  ...o
}) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": e,
      className: l(p({ orientation: e }), t),
      ...o
    }
  );
}
function y({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "field-content",
      className: l(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        t
      ),
      ...e
    }
  );
}
function E({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a.jsx(
    c,
    {
      "data-slot": "field-label",
      className: l(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        t
      ),
      ...e
    }
  );
}
function L({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx(
    "div",
    {
      "data-slot": "field-label",
      className: l(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        t
      ),
      ...e
    }
  );
}
function S({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: l(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        t
      ),
      ...e
    }
  );
}
function z({
  children: t,
  className: e,
  ...o
}) {
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!t,
      className: l(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        e
      ),
      ...o,
      children: [
        /* @__PURE__ */ a.jsx(m, { className: "absolute inset-0 top-1/2" }),
        t && /* @__PURE__ */ a.jsx(
          "span",
          {
            className: "bg-background text-muted-foreground relative mx-auto block w-fit px-2",
            "data-slot": "field-separator-content",
            children: t
          }
        )
      ]
    }
  );
}
function M({
  className: t,
  children: e,
  errors: o,
  ...s
}) {
  const i = f(() => {
    if (e)
      return e;
    if (!o?.length)
      return null;
    const d = [
      ...new Map(o.map((r) => [r?.message, r])).values()
    ];
    return d?.length == 1 ? d[0]?.message : /* @__PURE__ */ a.jsx("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: d.map(
      (r, n) => r?.message && /* @__PURE__ */ a.jsx("li", { children: r.message }, n)
    ) });
  }, [e, o]);
  return i ? /* @__PURE__ */ a.jsx(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: l("text-destructive text-sm font-normal", t),
      ...s,
      children: i
    }
  ) : null;
}
export {
  F as Field,
  y as FieldContent,
  S as FieldDescription,
  M as FieldError,
  k as FieldGroup,
  E as FieldLabel,
  N as FieldLegend,
  z as FieldSeparator,
  w as FieldSet,
  L as FieldTitle
};
