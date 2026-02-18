import { j as h } from "../../jsx-runtime.js";
import * as a from "react";
import { useLayoutEffect as Wn } from "react";
import * as it from "react-dom";
import { c as Nt, u as ne, e as F, d as st, b as gt } from "../../index6.js";
import { c as Fn, u as zn } from "../../index10.js";
import { c as Ve, u as Z } from "../../index4.js";
import { P as Un, h as Kn, u as Yn, R as Xn, F as Gn, D as Zn } from "../../Combination.js";
import { u as Ot } from "../../index7.js";
import { a as qn, u as Jn } from "../../index9.js";
import { ChevronDown as It, ChevronUp as Qn, Check as eo } from "lucide-react";
import { c as ce } from "../../utils.js";
function wt(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
const to = ["top", "right", "bottom", "left"], ae = Math.min, K = Math.max, De = Math.round, Ie = Math.floor, te = (e) => ({
  x: e,
  y: e
}), no = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, oo = {
  start: "end",
  end: "start"
};
function qe(e, t, n) {
  return K(e, ae(t, n));
}
function ie(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function se(e) {
  return e.split("-")[0];
}
function Ce(e) {
  return e.split("-")[1];
}
function lt(e) {
  return e === "x" ? "y" : "x";
}
function ct(e) {
  return e === "y" ? "height" : "width";
}
const ro = /* @__PURE__ */ new Set(["top", "bottom"]);
function ee(e) {
  return ro.has(se(e)) ? "y" : "x";
}
function at(e) {
  return lt(ee(e));
}
function io(e, t, n) {
  n === void 0 && (n = !1);
  const o = Ce(e), r = at(e), i = ct(r);
  let s = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = Me(s)), [s, Me(s)];
}
function so(e) {
  const t = Me(e);
  return [Je(e), t, Je(t)];
}
function Je(e) {
  return e.replace(/start|end/g, (t) => oo[t]);
}
const xt = ["left", "right"], yt = ["right", "left"], lo = ["top", "bottom"], co = ["bottom", "top"];
function ao(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? yt : xt : t ? xt : yt;
    case "left":
    case "right":
      return t ? lo : co;
    default:
      return [];
  }
}
function fo(e, t, n, o) {
  const r = Ce(e);
  let i = ao(se(e), n === "start", o);
  return r && (i = i.map((s) => s + "-" + r), t && (i = i.concat(i.map(Je)))), i;
}
function Me(e) {
  return e.replace(/left|right|bottom|top/g, (t) => no[t]);
}
function uo(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function _t(e) {
  return typeof e != "number" ? uo(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function je(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function vt(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const i = ee(t), s = at(t), l = ct(s), c = se(t), f = i === "y", d = o.x + o.width / 2 - r.width / 2, u = o.y + o.height / 2 - r.height / 2, x = o[l] / 2 - r[l] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: d,
        y: o.y - r.height
      };
      break;
    case "bottom":
      m = {
        x: d,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: u
      };
      break;
    case "left":
      m = {
        x: o.x - r.width,
        y: u
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch (Ce(t)) {
    case "start":
      m[s] -= x * (n && f ? -1 : 1);
      break;
    case "end":
      m[s] += x * (n && f ? -1 : 1);
      break;
  }
  return m;
}
const po = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: s
  } = n, l = i.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let f = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: d,
    y: u
  } = vt(f, o, c), x = o, m = {}, g = 0;
  for (let p = 0; p < l.length; p++) {
    const {
      name: y,
      fn: v
    } = l[p], {
      x: w,
      y: S,
      data: b,
      reset: C
    } = await v({
      x: d,
      y: u,
      initialPlacement: o,
      placement: x,
      strategy: r,
      middlewareData: m,
      rects: f,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = w ?? d, u = S ?? u, m = {
      ...m,
      [y]: {
        ...m[y],
        ...b
      }
    }, C && g <= 50 && (g++, typeof C == "object" && (C.placement && (x = C.placement), C.rects && (f = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : C.rects), {
      x: d,
      y: u
    } = vt(f, x, c)), p = -1);
  }
  return {
    x: d,
    y: u,
    placement: x,
    strategy: r,
    middlewareData: m
  };
};
async function Te(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: i,
    rects: s,
    elements: l,
    strategy: c
  } = e, {
    boundary: f = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: u = "floating",
    altBoundary: x = !1,
    padding: m = 0
  } = ie(t, e), g = _t(m), y = l[x ? u === "floating" ? "reference" : "floating" : u], v = je(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(y))) == null || n ? y : y.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(l.floating)),
    boundary: f,
    rootBoundary: d,
    strategy: c
  })), w = u === "floating" ? {
    x: o,
    y: r,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, S = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(l.floating)), b = await (i.isElement == null ? void 0 : i.isElement(S)) ? await (i.getScale == null ? void 0 : i.getScale(S)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = je(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: w,
    offsetParent: S,
    strategy: c
  }) : w);
  return {
    top: (v.top - C.top + g.top) / b.y,
    bottom: (C.bottom - v.bottom + g.bottom) / b.y,
    left: (v.left - C.left + g.left) / b.x,
    right: (C.right - v.right + g.right) / b.x
  };
}
const mo = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: i,
      platform: s,
      elements: l,
      middlewareData: c
    } = t, {
      element: f,
      padding: d = 0
    } = ie(e, t) || {};
    if (f == null)
      return {};
    const u = _t(d), x = {
      x: n,
      y: o
    }, m = at(r), g = ct(m), p = await s.getDimensions(f), y = m === "y", v = y ? "top" : "left", w = y ? "bottom" : "right", S = y ? "clientHeight" : "clientWidth", b = i.reference[g] + i.reference[m] - x[m] - i.floating[g], C = x[m] - i.reference[m], N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(f));
    let E = N ? N[S] : 0;
    (!E || !await (s.isElement == null ? void 0 : s.isElement(N))) && (E = l.floating[S] || i.floating[g]);
    const I = b / 2 - C / 2, k = E / 2 - p[g] / 2 - 1, D = ae(u[v], k), M = ae(u[w], k), j = D, _ = E - p[g] - M, T = E / 2 - p[g] / 2 + I, H = qe(j, T, _), A = !c.arrow && Ce(r) != null && T !== H && i.reference[g] / 2 - (T < j ? D : M) - p[g] / 2 < 0, O = A ? T < j ? T - j : T - _ : 0;
    return {
      [m]: x[m] + O,
      data: {
        [m]: H,
        centerOffset: T - H - O,
        ...A && {
          alignmentOffset: O
        }
      },
      reset: A
    };
  }
}), ho = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: l,
        platform: c,
        elements: f
      } = t, {
        mainAxis: d = !0,
        crossAxis: u = !0,
        fallbackPlacements: x,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: p = !0,
        ...y
      } = ie(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const v = se(r), w = ee(l), S = se(l) === l, b = await (c.isRTL == null ? void 0 : c.isRTL(f.floating)), C = x || (S || !p ? [Me(l)] : so(l)), N = g !== "none";
      !x && N && C.push(...fo(l, p, g, b));
      const E = [l, ...C], I = await Te(t, y), k = [];
      let D = ((o = i.flip) == null ? void 0 : o.overflows) || [];
      if (d && k.push(I[v]), u) {
        const T = io(r, s, b);
        k.push(I[T[0]], I[T[1]]);
      }
      if (D = [...D, {
        placement: r,
        overflows: k
      }], !k.every((T) => T <= 0)) {
        var M, j;
        const T = (((M = i.flip) == null ? void 0 : M.index) || 0) + 1, H = E[T];
        if (H && (!(u === "alignment" ? w !== ee(H) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        D.every((P) => ee(P.placement) === w ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: T,
              overflows: D
            },
            reset: {
              placement: H
            }
          };
        let A = (j = D.filter((O) => O.overflows[0] <= 0).sort((O, P) => O.overflows[1] - P.overflows[1])[0]) == null ? void 0 : j.placement;
        if (!A)
          switch (m) {
            case "bestFit": {
              var _;
              const O = (_ = D.filter((P) => {
                if (N) {
                  const L = ee(P.placement);
                  return L === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((L) => L > 0).reduce((L, U) => L + U, 0)]).sort((P, L) => P[1] - L[1])[0]) == null ? void 0 : _[0];
              O && (A = O);
              break;
            }
            case "initialPlacement":
              A = l;
              break;
          }
        if (r !== A)
          return {
            reset: {
              placement: A
            }
          };
      }
      return {};
    }
  };
};
function St(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ct(e) {
  return to.some((t) => e[t] >= 0);
}
const go = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = ie(e, t);
      switch (o) {
        case "referenceHidden": {
          const i = await Te(t, {
            ...r,
            elementContext: "reference"
          }), s = St(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Ct(s)
            }
          };
        }
        case "escaped": {
          const i = await Te(t, {
            ...r,
            altBoundary: !0
          }), s = St(i, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Ct(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Dt = /* @__PURE__ */ new Set(["left", "top"]);
async function wo(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, i = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), s = se(n), l = Ce(n), c = ee(n) === "y", f = Dt.has(s) ? -1 : 1, d = i && c ? -1 : 1, u = ie(t, e);
  let {
    mainAxis: x,
    crossAxis: m,
    alignmentAxis: g
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return l && typeof g == "number" && (m = l === "end" ? g * -1 : g), c ? {
    x: m * d,
    y: x * f
  } : {
    x: x * f,
    y: m * d
  };
}
const xo = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: i,
        placement: s,
        middlewareData: l
      } = t, c = await wo(t, e);
      return s === ((n = l.offset) == null ? void 0 : n.placement) && (o = l.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, yo = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: i = !0,
        crossAxis: s = !1,
        limiter: l = {
          fn: (y) => {
            let {
              x: v,
              y: w
            } = y;
            return {
              x: v,
              y: w
            };
          }
        },
        ...c
      } = ie(e, t), f = {
        x: n,
        y: o
      }, d = await Te(t, c), u = ee(se(r)), x = lt(u);
      let m = f[x], g = f[u];
      if (i) {
        const y = x === "y" ? "top" : "left", v = x === "y" ? "bottom" : "right", w = m + d[y], S = m - d[v];
        m = qe(w, m, S);
      }
      if (s) {
        const y = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", w = g + d[y], S = g - d[v];
        g = qe(w, g, S);
      }
      const p = l.fn({
        ...t,
        [x]: m,
        [u]: g
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - o,
          enabled: {
            [x]: i,
            [u]: s
          }
        }
      };
    }
  };
}, vo = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: i,
        middlewareData: s
      } = t, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: f = !0
      } = ie(e, t), d = {
        x: n,
        y: o
      }, u = ee(r), x = lt(u);
      let m = d[x], g = d[u];
      const p = ie(l, t), y = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (c) {
        const S = x === "y" ? "height" : "width", b = i.reference[x] - i.floating[S] + y.mainAxis, C = i.reference[x] + i.reference[S] - y.mainAxis;
        m < b ? m = b : m > C && (m = C);
      }
      if (f) {
        var v, w;
        const S = x === "y" ? "width" : "height", b = Dt.has(se(r)), C = i.reference[u] - i.floating[S] + (b && ((v = s.offset) == null ? void 0 : v[u]) || 0) + (b ? 0 : y.crossAxis), N = i.reference[u] + i.reference[S] + (b ? 0 : ((w = s.offset) == null ? void 0 : w[u]) || 0) - (b ? y.crossAxis : 0);
        g < C ? g = C : g > N && (g = N);
      }
      return {
        [x]: m,
        [u]: g
      };
    }
  };
}, So = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: i,
        platform: s,
        elements: l
      } = t, {
        apply: c = () => {
        },
        ...f
      } = ie(e, t), d = await Te(t, f), u = se(r), x = Ce(r), m = ee(r) === "y", {
        width: g,
        height: p
      } = i.floating;
      let y, v;
      u === "top" || u === "bottom" ? (y = u, v = x === (await (s.isRTL == null ? void 0 : s.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (v = u, y = x === "end" ? "top" : "bottom");
      const w = p - d.top - d.bottom, S = g - d.left - d.right, b = ae(p - d[y], w), C = ae(g - d[v], S), N = !t.middlewareData.shift;
      let E = b, I = C;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (I = S), (o = t.middlewareData.shift) != null && o.enabled.y && (E = w), N && !x) {
        const D = K(d.left, 0), M = K(d.right, 0), j = K(d.top, 0), _ = K(d.bottom, 0);
        m ? I = g - 2 * (D !== 0 || M !== 0 ? D + M : K(d.left, d.right)) : E = p - 2 * (j !== 0 || _ !== 0 ? j + _ : K(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: I,
        availableHeight: E
      });
      const k = await s.getDimensions(l.floating);
      return g !== k.width || p !== k.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ke() {
  return typeof window < "u";
}
function be(e) {
  return Mt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function re(e) {
  var t;
  return (t = (Mt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Mt(e) {
  return ke() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function J(e) {
  return ke() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function oe(e) {
  return ke() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function bt(e) {
  return !ke() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
const Co = /* @__PURE__ */ new Set(["inline", "contents"]);
function Oe(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = Q(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Co.has(r);
}
const bo = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Ro(e) {
  return bo.has(be(e));
}
const Po = [":popover-open", ":modal"];
function He(e) {
  return Po.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Eo = ["transform", "translate", "scale", "rotate", "perspective"], Ao = ["transform", "translate", "scale", "rotate", "perspective", "filter"], To = ["paint", "layout", "strict", "content"];
function ft(e) {
  const t = dt(), n = J(e) ? Q(e) : e;
  return Eo.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Ao.some((o) => (n.willChange || "").includes(o)) || To.some((o) => (n.contain || "").includes(o));
}
function No(e) {
  let t = fe(e);
  for (; oe(t) && !Se(t); ) {
    if (ft(t))
      return t;
    if (He(t))
      return null;
    t = fe(t);
  }
  return null;
}
function dt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Oo = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Se(e) {
  return Oo.has(be(e));
}
function Q(e) {
  return Y(e).getComputedStyle(e);
}
function Be(e) {
  return J(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function fe(e) {
  if (be(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    bt(e) && e.host || // Fallback.
    re(e)
  );
  return bt(t) ? t.host : t;
}
function jt(e) {
  const t = fe(e);
  return Se(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : oe(t) && Oe(t) ? t : jt(t);
}
function Ne(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = jt(e), i = r === ((o = e.ownerDocument) == null ? void 0 : o.body), s = Y(r);
  if (i) {
    const l = Qe(s);
    return t.concat(s, s.visualViewport || [], Oe(r) ? r : [], l && n ? Ne(l) : []);
  }
  return t.concat(r, Ne(r, [], n));
}
function Qe(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Lt(e) {
  const t = Q(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = oe(e), i = r ? e.offsetWidth : n, s = r ? e.offsetHeight : o, l = De(n) !== i || De(o) !== s;
  return l && (n = i, o = s), {
    width: n,
    height: o,
    $: l
  };
}
function ut(e) {
  return J(e) ? e : e.contextElement;
}
function ve(e) {
  const t = ut(e);
  if (!oe(t))
    return te(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: i
  } = Lt(t);
  let s = (i ? De(n.width) : n.width) / o, l = (i ? De(n.height) : n.height) / r;
  return (!s || !Number.isFinite(s)) && (s = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: s,
    y: l
  };
}
const Io = /* @__PURE__ */ te(0);
function $t(e) {
  const t = Y(e);
  return !dt() || !t.visualViewport ? Io : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function _o(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Y(e) ? !1 : t;
}
function ge(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = ut(e);
  let s = te(1);
  t && (o ? J(o) && (s = ve(o)) : s = ve(e));
  const l = _o(i, n, o) ? $t(i) : te(0);
  let c = (r.left + l.x) / s.x, f = (r.top + l.y) / s.y, d = r.width / s.x, u = r.height / s.y;
  if (i) {
    const x = Y(i), m = o && J(o) ? Y(o) : o;
    let g = x, p = Qe(g);
    for (; p && o && m !== g; ) {
      const y = ve(p), v = p.getBoundingClientRect(), w = Q(p), S = v.left + (p.clientLeft + parseFloat(w.paddingLeft)) * y.x, b = v.top + (p.clientTop + parseFloat(w.paddingTop)) * y.y;
      c *= y.x, f *= y.y, d *= y.x, u *= y.y, c += S, f += b, g = Y(p), p = Qe(g);
    }
  }
  return je({
    width: d,
    height: u,
    x: c,
    y: f
  });
}
function We(e, t) {
  const n = Be(e).scrollLeft;
  return t ? t.left + n : ge(re(e)).left + n;
}
function Vt(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - We(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function Do(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const i = r === "fixed", s = re(o), l = t ? He(t.floating) : !1;
  if (o === s || l && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = te(1);
  const d = te(0), u = oe(o);
  if ((u || !u && !i) && ((be(o) !== "body" || Oe(s)) && (c = Be(o)), oe(o))) {
    const m = ge(o);
    f = ve(o), d.x = m.x + o.clientLeft, d.y = m.y + o.clientTop;
  }
  const x = s && !u && !i ? Vt(s, c) : te(0);
  return {
    width: n.width * f.x,
    height: n.height * f.y,
    x: n.x * f.x - c.scrollLeft * f.x + d.x + x.x,
    y: n.y * f.y - c.scrollTop * f.y + d.y + x.y
  };
}
function Mo(e) {
  return Array.from(e.getClientRects());
}
function jo(e) {
  const t = re(e), n = Be(e), o = e.ownerDocument.body, r = K(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), i = K(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -n.scrollLeft + We(e);
  const l = -n.scrollTop;
  return Q(o).direction === "rtl" && (s += K(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: i,
    x: s,
    y: l
  };
}
const Rt = 25;
function Lo(e, t) {
  const n = Y(e), o = re(e), r = n.visualViewport;
  let i = o.clientWidth, s = o.clientHeight, l = 0, c = 0;
  if (r) {
    i = r.width, s = r.height;
    const d = dt();
    (!d || d && t === "fixed") && (l = r.offsetLeft, c = r.offsetTop);
  }
  const f = We(o);
  if (f <= 0) {
    const d = o.ownerDocument, u = d.body, x = getComputedStyle(u), m = d.compatMode === "CSS1Compat" && parseFloat(x.marginLeft) + parseFloat(x.marginRight) || 0, g = Math.abs(o.clientWidth - u.clientWidth - m);
    g <= Rt && (i -= g);
  } else f <= Rt && (i += f);
  return {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
const $o = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Vo(e, t) {
  const n = ge(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, i = oe(e) ? ve(e) : te(1), s = e.clientWidth * i.x, l = e.clientHeight * i.y, c = r * i.x, f = o * i.y;
  return {
    width: s,
    height: l,
    x: c,
    y: f
  };
}
function Pt(e, t, n) {
  let o;
  if (t === "viewport")
    o = Lo(e, n);
  else if (t === "document")
    o = jo(re(e));
  else if (J(t))
    o = Vo(t, n);
  else {
    const r = $t(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return je(o);
}
function kt(e, t) {
  const n = fe(e);
  return n === t || !J(n) || Se(n) ? !1 : Q(n).position === "fixed" || kt(n, t);
}
function ko(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Ne(e, [], !1).filter((l) => J(l) && be(l) !== "body"), r = null;
  const i = Q(e).position === "fixed";
  let s = i ? fe(e) : e;
  for (; J(s) && !Se(s); ) {
    const l = Q(s), c = ft(s);
    !c && l.position === "fixed" && (r = null), (i ? !c && !r : !c && l.position === "static" && !!r && $o.has(r.position) || Oe(s) && !c && kt(e, s)) ? o = o.filter((d) => d !== s) : r = l, s = fe(s);
  }
  return t.set(e, o), o;
}
function Ho(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const s = [...n === "clippingAncestors" ? He(t) ? [] : ko(t, this._c) : [].concat(n), o], l = s[0], c = s.reduce((f, d) => {
    const u = Pt(t, d, r);
    return f.top = K(u.top, f.top), f.right = ae(u.right, f.right), f.bottom = ae(u.bottom, f.bottom), f.left = K(u.left, f.left), f;
  }, Pt(t, l, r));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Bo(e) {
  const {
    width: t,
    height: n
  } = Lt(e);
  return {
    width: t,
    height: n
  };
}
function Wo(e, t, n) {
  const o = oe(t), r = re(t), i = n === "fixed", s = ge(e, !0, i, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = te(0);
  function f() {
    c.x = We(r);
  }
  if (o || !o && !i)
    if ((be(t) !== "body" || Oe(r)) && (l = Be(t)), o) {
      const m = ge(t, !0, i, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else r && f();
  i && !o && r && f();
  const d = r && !o && !i ? Vt(r, l) : te(0), u = s.left + l.scrollLeft - c.x - d.x, x = s.top + l.scrollTop - c.y - d.y;
  return {
    x: u,
    y: x,
    width: s.width,
    height: s.height
  };
}
function Ge(e) {
  return Q(e).position === "static";
}
function Et(e, t) {
  if (!oe(e) || Q(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return re(e) === n && (n = n.ownerDocument.body), n;
}
function Ht(e, t) {
  const n = Y(e);
  if (He(e))
    return n;
  if (!oe(e)) {
    let r = fe(e);
    for (; r && !Se(r); ) {
      if (J(r) && !Ge(r))
        return r;
      r = fe(r);
    }
    return n;
  }
  let o = Et(e, t);
  for (; o && Ro(o) && Ge(o); )
    o = Et(o, t);
  return o && Se(o) && Ge(o) && !ft(o) ? n : o || No(e) || n;
}
const Fo = async function(e) {
  const t = this.getOffsetParent || Ht, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Wo(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function zo(e) {
  return Q(e).direction === "rtl";
}
const Uo = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Do,
  getDocumentElement: re,
  getClippingRect: Ho,
  getOffsetParent: Ht,
  getElementRects: Fo,
  getClientRects: Mo,
  getDimensions: Bo,
  getScale: ve,
  isElement: J,
  isRTL: zo
};
function Bt(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ko(e, t) {
  let n = null, o;
  const r = re(e);
  function i() {
    var l;
    clearTimeout(o), (l = n) == null || l.disconnect(), n = null;
  }
  function s(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), i();
    const f = e.getBoundingClientRect(), {
      left: d,
      top: u,
      width: x,
      height: m
    } = f;
    if (l || t(), !x || !m)
      return;
    const g = Ie(u), p = Ie(r.clientWidth - (d + x)), y = Ie(r.clientHeight - (u + m)), v = Ie(d), S = {
      rootMargin: -g + "px " + -p + "px " + -y + "px " + -v + "px",
      threshold: K(0, ae(1, c)) || 1
    };
    let b = !0;
    function C(N) {
      const E = N[0].intersectionRatio;
      if (E !== c) {
        if (!b)
          return s();
        E ? s(!1, E) : o = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !Bt(f, e.getBoundingClientRect()) && s(), b = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...S,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, S);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function Yo(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, f = ut(e), d = r || i ? [...f ? Ne(f) : [], ...Ne(t)] : [];
  d.forEach((v) => {
    r && v.addEventListener("scroll", n, {
      passive: !0
    }), i && v.addEventListener("resize", n);
  });
  const u = f && l ? Ko(f, n) : null;
  let x = -1, m = null;
  s && (m = new ResizeObserver((v) => {
    let [w] = v;
    w && w.target === f && m && (m.unobserve(t), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
      var S;
      (S = m) == null || S.observe(t);
    })), n();
  }), f && !c && m.observe(f), m.observe(t));
  let g, p = c ? ge(e) : null;
  c && y();
  function y() {
    const v = ge(e);
    p && !Bt(p, v) && n(), p = v, g = requestAnimationFrame(y);
  }
  return n(), () => {
    var v;
    d.forEach((w) => {
      r && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), u?.(), (v = m) == null || v.disconnect(), m = null, c && cancelAnimationFrame(g);
  };
}
const Xo = xo, Go = yo, Zo = ho, qo = So, Jo = go, At = mo, Qo = vo, er = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Uo,
    ...n
  }, i = {
    ...r.platform,
    _c: o
  };
  return po(e, t, {
    ...r,
    platform: i
  });
};
var tr = typeof document < "u", nr = function() {
}, _e = tr ? Wn : nr;
function Le(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (o = n; o-- !== 0; )
        if (!Le(e[o], t[o]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const i = r[o];
      if (!(i === "_owner" && e.$$typeof) && !Le(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wt(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Tt(e, t) {
  const n = Wt(e);
  return Math.round(t * n) / n;
}
function Ze(e) {
  const t = a.useRef(e);
  return _e(() => {
    t.current = e;
  }), t;
}
function or(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: r,
    elements: {
      reference: i,
      floating: s
    } = {},
    transform: l = !0,
    whileElementsMounted: c,
    open: f
  } = e, [d, u] = a.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [x, m] = a.useState(o);
  Le(x, o) || m(o);
  const [g, p] = a.useState(null), [y, v] = a.useState(null), w = a.useCallback((P) => {
    P !== N.current && (N.current = P, p(P));
  }, []), S = a.useCallback((P) => {
    P !== E.current && (E.current = P, v(P));
  }, []), b = i || g, C = s || y, N = a.useRef(null), E = a.useRef(null), I = a.useRef(d), k = c != null, D = Ze(c), M = Ze(r), j = Ze(f), _ = a.useCallback(() => {
    if (!N.current || !E.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: x
    };
    M.current && (P.platform = M.current), er(N.current, E.current, P).then((L) => {
      const U = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: j.current !== !1
      };
      T.current && !Le(I.current, U) && (I.current = U, it.flushSync(() => {
        u(U);
      }));
    });
  }, [x, t, n, M, j]);
  _e(() => {
    f === !1 && I.current.isPositioned && (I.current.isPositioned = !1, u((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [f]);
  const T = a.useRef(!1);
  _e(() => (T.current = !0, () => {
    T.current = !1;
  }), []), _e(() => {
    if (b && (N.current = b), C && (E.current = C), b && C) {
      if (D.current)
        return D.current(b, C, _);
      _();
    }
  }, [b, C, _, D, k]);
  const H = a.useMemo(() => ({
    reference: N,
    floating: E,
    setReference: w,
    setFloating: S
  }), [w, S]), A = a.useMemo(() => ({
    reference: b,
    floating: C
  }), [b, C]), O = a.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!A.floating)
      return P;
    const L = Tt(A.floating, d.x), U = Tt(A.floating, d.y);
    return l ? {
      ...P,
      transform: "translate(" + L + "px, " + U + "px)",
      ...Wt(A.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: U
    };
  }, [n, l, A.floating, d.x, d.y]);
  return a.useMemo(() => ({
    ...d,
    update: _,
    refs: H,
    elements: A,
    floatingStyles: O
  }), [d, _, H, A, O]);
}
const rr = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: o,
        padding: r
      } = typeof e == "function" ? e(n) : e;
      return o && t(o) ? o.current != null ? At({
        element: o.current,
        padding: r
      }).fn(n) : {} : o ? At({
        element: o,
        padding: r
      }).fn(n) : {};
    }
  };
}, ir = (e, t) => ({
  ...Xo(e),
  options: [e, t]
}), sr = (e, t) => ({
  ...Go(e),
  options: [e, t]
}), lr = (e, t) => ({
  ...Qo(e),
  options: [e, t]
}), cr = (e, t) => ({
  ...Zo(e),
  options: [e, t]
}), ar = (e, t) => ({
  ...qo(e),
  options: [e, t]
}), fr = (e, t) => ({
  ...Jo(e),
  options: [e, t]
}), dr = (e, t) => ({
  ...rr(e),
  options: [e, t]
});
// @__NO_SIDE_EFFECTS__
function ur(e) {
  const t = /* @__PURE__ */ pr(e), n = a.forwardRef((o, r) => {
    const { children: i, ...s } = o, l = a.Children.toArray(i), c = l.find(hr);
    if (c) {
      const f = c.props.children, d = l.map((u) => u === c ? a.Children.count(f) > 1 ? a.Children.only(null) : a.isValidElement(f) ? f.props.children : null : u);
      return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: a.isValidElement(f) ? a.cloneElement(f, void 0, d) : null });
    }
    return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function pr(e) {
  const t = a.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (a.isValidElement(r)) {
      const s = wr(r), l = gr(i, r.props);
      return r.type !== a.Fragment && (l.ref = o ? Ve(o, s) : s), a.cloneElement(r, l);
    }
    return a.Children.count(r) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var mr = /* @__PURE__ */ Symbol("radix.slottable");
function hr(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === mr;
}
function gr(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function wr(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var xr = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], yr = xr.reduce((e, t) => {
  const n = /* @__PURE__ */ ur(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), vr = "Arrow", Ft = a.forwardRef((e, t) => {
  const { children: n, width: o = 10, height: r = 5, ...i } = e;
  return /* @__PURE__ */ h.jsx(
    yr.svg,
    {
      ...i,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ h.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Ft.displayName = vr;
var Sr = Ft;
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  const t = /* @__PURE__ */ br(e), n = a.forwardRef((o, r) => {
    const { children: i, ...s } = o, l = a.Children.toArray(i), c = l.find(Pr);
    if (c) {
      const f = c.props.children, d = l.map((u) => u === c ? a.Children.count(f) > 1 ? a.Children.only(null) : a.isValidElement(f) ? f.props.children : null : u);
      return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: a.isValidElement(f) ? a.cloneElement(f, void 0, d) : null });
    }
    return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function br(e) {
  const t = a.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (a.isValidElement(r)) {
      const s = Ar(r), l = Er(i, r.props);
      return r.type !== a.Fragment && (l.ref = o ? Ve(o, s) : s), a.cloneElement(r, l);
    }
    return a.Children.count(r) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Rr = /* @__PURE__ */ Symbol("radix.slottable");
function Pr(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Rr;
}
function Er(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ar(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Tr = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], zt = Tr.reduce((e, t) => {
  const n = /* @__PURE__ */ Cr(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), pt = "Popper", [Ut, Kt] = Nt(pt), [Nr, Yt] = Ut(pt), Xt = (e) => {
  const { __scopePopper: t, children: n } = e, [o, r] = a.useState(null);
  return /* @__PURE__ */ h.jsx(Nr, { scope: t, anchor: o, onAnchorChange: r, children: n });
};
Xt.displayName = pt;
var Gt = "PopperAnchor", Zt = a.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e, i = Yt(Gt, n), s = a.useRef(null), l = Z(t, s), c = a.useRef(null);
    return a.useEffect(() => {
      const f = c.current;
      c.current = o?.current || s.current, f !== c.current && i.onAnchorChange(c.current);
    }), o ? null : /* @__PURE__ */ h.jsx(zt.div, { ...r, ref: l });
  }
);
Zt.displayName = Gt;
var mt = "PopperContent", [Or, Ir] = Ut(mt), qt = a.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: o = "bottom",
      sideOffset: r = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: l = 0,
      avoidCollisions: c = !0,
      collisionBoundary: f = [],
      collisionPadding: d = 0,
      sticky: u = "partial",
      hideWhenDetached: x = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: g,
      ...p
    } = e, y = Yt(mt, n), [v, w] = a.useState(null), S = Z(t, (R) => w(R)), [b, C] = a.useState(null), N = qn(b), E = N?.width ?? 0, I = N?.height ?? 0, k = o + (i !== "center" ? "-" + i : ""), D = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, M = Array.isArray(f) ? f : [f], j = M.length > 0, _ = {
      padding: D,
      boundary: M.filter(Dr),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: j
    }, { refs: T, floatingStyles: H, placement: A, isPositioned: O, middlewareData: P } = or({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: k,
      whileElementsMounted: (...R) => Yo(...R, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        ir({ mainAxis: r + I, alignmentAxis: s }),
        c && sr({
          mainAxis: !0,
          crossAxis: !1,
          limiter: u === "partial" ? lr() : void 0,
          ..._
        }),
        c && cr({ ..._ }),
        ar({
          ..._,
          apply: ({ elements: R, rects: B, availableWidth: z, availableHeight: $ }) => {
            const { width: V, height: W } = B.reference, G = R.floating.style;
            G.setProperty("--radix-popper-available-width", `${z}px`), G.setProperty("--radix-popper-available-height", `${$}px`), G.setProperty("--radix-popper-anchor-width", `${V}px`), G.setProperty("--radix-popper-anchor-height", `${W}px`);
          }
        }),
        b && dr({ element: b, padding: l }),
        Mr({ arrowWidth: E, arrowHeight: I }),
        x && fr({ strategy: "referenceHidden", ..._ })
      ]
    }), [L, U] = en(A), pe = Ot(g);
    ne(() => {
      O && pe?.();
    }, [O, pe]);
    const Pe = P.arrow?.x, Ee = P.arrow?.y, le = P.arrow?.centerOffset !== 0, [ye, me] = a.useState();
    return ne(() => {
      v && me(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ h.jsx(
      "div",
      {
        ref: T.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: O ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ye,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ h.jsx(
          Or,
          {
            scope: n,
            placedSide: L,
            onArrowChange: C,
            arrowX: Pe,
            arrowY: Ee,
            shouldHideArrow: le,
            children: /* @__PURE__ */ h.jsx(
              zt.div,
              {
                "data-side": L,
                "data-align": U,
                ...p,
                ref: S,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: O ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
qt.displayName = mt;
var Jt = "PopperArrow", _r = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Qt = a.forwardRef(function(t, n) {
  const { __scopePopper: o, ...r } = t, i = Ir(Jt, o), s = _r[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ h.jsx(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ h.jsx(
          Sr,
          {
            ...r,
            ref: n,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Qt.displayName = Jt;
function Dr(e) {
  return e !== null;
}
var Mr = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t, s = r.arrow?.centerOffset !== 0, l = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [f, d] = en(n), u = { start: "0%", center: "50%", end: "100%" }[d], x = (r.arrow?.x ?? 0) + l / 2, m = (r.arrow?.y ?? 0) + c / 2;
    let g = "", p = "";
    return f === "bottom" ? (g = s ? u : `${x}px`, p = `${-c}px`) : f === "top" ? (g = s ? u : `${x}px`, p = `${o.floating.height + c}px`) : f === "right" ? (g = `${-c}px`, p = s ? u : `${m}px`) : f === "left" && (g = `${o.floating.width + c}px`, p = s ? u : `${m}px`), { data: { x: g, y: p } };
  }
});
function en(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var jr = Xt, Lr = Zt, $r = qt, Vr = Qt;
// @__NO_SIDE_EFFECTS__
function tn(e) {
  const t = /* @__PURE__ */ kr(e), n = a.forwardRef((o, r) => {
    const { children: i, ...s } = o, l = a.Children.toArray(i), c = l.find(Br);
    if (c) {
      const f = c.props.children, d = l.map((u) => u === c ? a.Children.count(f) > 1 ? a.Children.only(null) : a.isValidElement(f) ? f.props.children : null : u);
      return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: a.isValidElement(f) ? a.cloneElement(f, void 0, d) : null });
    }
    return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
  const t = a.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (a.isValidElement(r)) {
      const s = Fr(r), l = Wr(i, r.props);
      return r.type !== a.Fragment && (l.ref = o ? Ve(o, s) : s), a.cloneElement(r, l);
    }
    return a.Children.count(r) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Hr = /* @__PURE__ */ Symbol("radix.slottable");
function Br(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Hr;
}
function Wr(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Fr(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var zr = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], X = zr.reduce((e, t) => {
  const n = /* @__PURE__ */ tn(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {});
// @__NO_SIDE_EFFECTS__
function Ur(e) {
  const t = /* @__PURE__ */ Kr(e), n = a.forwardRef((o, r) => {
    const { children: i, ...s } = o, l = a.Children.toArray(i), c = l.find(Xr);
    if (c) {
      const f = c.props.children, d = l.map((u) => u === c ? a.Children.count(f) > 1 ? a.Children.only(null) : a.isValidElement(f) ? f.props.children : null : u);
      return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: a.isValidElement(f) ? a.cloneElement(f, void 0, d) : null });
    }
    return /* @__PURE__ */ h.jsx(t, { ...s, ref: r, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Kr(e) {
  const t = a.forwardRef((n, o) => {
    const { children: r, ...i } = n;
    if (a.isValidElement(r)) {
      const s = Zr(r), l = Gr(i, r.props);
      return r.type !== a.Fragment && (l.ref = o ? Ve(o, s) : s), a.cloneElement(r, l);
    }
    return a.Children.count(r) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Yr = /* @__PURE__ */ Symbol("radix.slottable");
function Xr(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Yr;
}
function Gr(e, t) {
  const n = { ...t };
  for (const o in t) {
    const r = e[o], i = t[o];
    /^on[A-Z]/.test(o) ? r && i ? n[o] = (...l) => {
      const c = i(...l);
      return r(...l), c;
    } : r && (n[o] = r) : o === "style" ? n[o] = { ...r, ...i } : o === "className" && (n[o] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Zr(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var qr = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Jr = qr.reduce((e, t) => {
  const n = /* @__PURE__ */ Ur(`Primitive.${t}`), o = a.forwardRef((r, i) => {
    const { asChild: s, ...l } = r, c = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h.jsx(c, { ...l, ref: i });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), nn = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Qr = "VisuallyHidden", ei = a.forwardRef(
  (e, t) => /* @__PURE__ */ h.jsx(
    Jr.span,
    {
      ...e,
      ref: t,
      style: { ...nn, ...e.style }
    }
  )
);
ei.displayName = Qr;
var ti = [" ", "Enter", "ArrowUp", "ArrowDown"], ni = [" ", "Enter"], we = "Select", [Fe, ze, oi] = Fn(we), [Re] = Nt(we, [
  oi,
  Kt
]), Ue = Kt(), [ri, de] = Re(we), [ii, si] = Re(we), on = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: o,
    defaultOpen: r,
    onOpenChange: i,
    value: s,
    defaultValue: l,
    onValueChange: c,
    dir: f,
    name: d,
    autoComplete: u,
    disabled: x,
    required: m,
    form: g
  } = e, p = Ue(t), [y, v] = a.useState(null), [w, S] = a.useState(null), [b, C] = a.useState(!1), N = zn(f), [E, I] = gt({
    prop: o,
    defaultProp: r ?? !1,
    onChange: i,
    caller: we
  }), [k, D] = gt({
    prop: s,
    defaultProp: l,
    onChange: c,
    caller: we
  }), M = a.useRef(null), j = y ? g || !!y.closest("form") : !0, [_, T] = a.useState(/* @__PURE__ */ new Set()), H = Array.from(_).map((A) => A.props.value).join(";");
  return /* @__PURE__ */ h.jsx(jr, { ...p, children: /* @__PURE__ */ h.jsxs(
    ri,
    {
      required: m,
      scope: t,
      trigger: y,
      onTriggerChange: v,
      valueNode: w,
      onValueNodeChange: S,
      valueNodeHasChildren: b,
      onValueNodeHasChildrenChange: C,
      contentId: st(),
      value: k,
      onValueChange: D,
      open: E,
      onOpenChange: I,
      dir: N,
      triggerPointerDownPosRef: M,
      disabled: x,
      children: [
        /* @__PURE__ */ h.jsx(Fe.Provider, { scope: t, children: /* @__PURE__ */ h.jsx(
          ii,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: a.useCallback((A) => {
              T((O) => new Set(O).add(A));
            }, []),
            onNativeOptionRemove: a.useCallback((A) => {
              T((O) => {
                const P = new Set(O);
                return P.delete(A), P;
              });
            }, []),
            children: n
          }
        ) }),
        j ? /* @__PURE__ */ h.jsxs(
          Nn,
          {
            "aria-hidden": !0,
            required: m,
            tabIndex: -1,
            name: d,
            autoComplete: u,
            value: k,
            onChange: (A) => D(A.target.value),
            disabled: x,
            form: g,
            children: [
              k === void 0 ? /* @__PURE__ */ h.jsx("option", { value: "" }) : null,
              Array.from(_)
            ]
          },
          H
        ) : null
      ]
    }
  ) });
};
on.displayName = we;
var rn = "SelectTrigger", sn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: o = !1, ...r } = e, i = Ue(n), s = de(rn, n), l = s.disabled || o, c = Z(t, s.onTriggerChange), f = ze(n), d = a.useRef("touch"), [u, x, m] = In((p) => {
      const y = f().filter((S) => !S.disabled), v = y.find((S) => S.value === s.value), w = _n(y, p, v);
      w !== void 0 && s.onValueChange(w.value);
    }), g = (p) => {
      l || (s.onOpenChange(!0), m()), p && (s.triggerPointerDownPosRef.current = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      });
    };
    return /* @__PURE__ */ h.jsx(Lr, { asChild: !0, ...i, children: /* @__PURE__ */ h.jsx(
      X.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": On(s.value) ? "" : void 0,
        ...r,
        ref: c,
        onClick: F(r.onClick, (p) => {
          p.currentTarget.focus(), d.current !== "mouse" && g(p);
        }),
        onPointerDown: F(r.onPointerDown, (p) => {
          d.current = p.pointerType;
          const y = p.target;
          y.hasPointerCapture(p.pointerId) && y.releasePointerCapture(p.pointerId), p.button === 0 && p.ctrlKey === !1 && p.pointerType === "mouse" && (g(p), p.preventDefault());
        }),
        onKeyDown: F(r.onKeyDown, (p) => {
          const y = u.current !== "";
          !(p.ctrlKey || p.altKey || p.metaKey) && p.key.length === 1 && x(p.key), !(y && p.key === " ") && ti.includes(p.key) && (g(), p.preventDefault());
        })
      }
    ) });
  }
);
sn.displayName = rn;
var ln = "SelectValue", cn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, children: i, placeholder: s = "", ...l } = e, c = de(ln, n), { onValueNodeHasChildrenChange: f } = c, d = i !== void 0, u = Z(t, c.onValueNodeChange);
    return ne(() => {
      f(d);
    }, [f, d]), /* @__PURE__ */ h.jsx(
      X.span,
      {
        ...l,
        ref: u,
        style: { pointerEvents: "none" },
        children: On(c.value) ? /* @__PURE__ */ h.jsx(h.Fragment, { children: s }) : i
      }
    );
  }
);
cn.displayName = ln;
var li = "SelectIcon", an = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: o, ...r } = e;
    return /* @__PURE__ */ h.jsx(X.span, { "aria-hidden": !0, ...r, ref: t, children: o || "▼" });
  }
);
an.displayName = li;
var ci = "SelectPortal", fn = (e) => /* @__PURE__ */ h.jsx(Un, { asChild: !0, ...e });
fn.displayName = ci;
var xe = "SelectContent", dn = a.forwardRef(
  (e, t) => {
    const n = de(xe, e.__scopeSelect), [o, r] = a.useState();
    if (ne(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const i = o;
      return i ? it.createPortal(
        /* @__PURE__ */ h.jsx(un, { scope: e.__scopeSelect, children: /* @__PURE__ */ h.jsx(Fe.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ h.jsx("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ h.jsx(pn, { ...e, ref: t });
  }
);
dn.displayName = xe;
var q = 10, [un, ue] = Re(xe), ai = "SelectContentImpl", fi = /* @__PURE__ */ tn("SelectContent.RemoveScroll"), pn = a.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: o = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: l,
      sideOffset: c,
      align: f,
      alignOffset: d,
      arrowPadding: u,
      collisionBoundary: x,
      collisionPadding: m,
      sticky: g,
      hideWhenDetached: p,
      avoidCollisions: y,
      //
      ...v
    } = e, w = de(xe, n), [S, b] = a.useState(null), [C, N] = a.useState(null), E = Z(t, (R) => b(R)), [I, k] = a.useState(null), [D, M] = a.useState(
      null
    ), j = ze(n), [_, T] = a.useState(!1), H = a.useRef(!1);
    a.useEffect(() => {
      if (S) return Kn(S);
    }, [S]), Yn();
    const A = a.useCallback(
      (R) => {
        const [B, ...z] = j().map((W) => W.ref.current), [$] = z.slice(-1), V = document.activeElement;
        for (const W of R)
          if (W === V || (W?.scrollIntoView({ block: "nearest" }), W === B && C && (C.scrollTop = 0), W === $ && C && (C.scrollTop = C.scrollHeight), W?.focus(), document.activeElement !== V)) return;
      },
      [j, C]
    ), O = a.useCallback(
      () => A([I, S]),
      [A, I, S]
    );
    a.useEffect(() => {
      _ && O();
    }, [_, O]);
    const { onOpenChange: P, triggerPointerDownPosRef: L } = w;
    a.useEffect(() => {
      if (S) {
        let R = { x: 0, y: 0 };
        const B = ($) => {
          R = {
            x: Math.abs(Math.round($.pageX) - (L.current?.x ?? 0)),
            y: Math.abs(Math.round($.pageY) - (L.current?.y ?? 0))
          };
        }, z = ($) => {
          R.x <= 10 && R.y <= 10 ? $.preventDefault() : S.contains($.target) || P(!1), document.removeEventListener("pointermove", B), L.current = null;
        };
        return L.current !== null && (document.addEventListener("pointermove", B), document.addEventListener("pointerup", z, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", B), document.removeEventListener("pointerup", z, { capture: !0 });
        };
      }
    }, [S, P, L]), a.useEffect(() => {
      const R = () => P(!1);
      return window.addEventListener("blur", R), window.addEventListener("resize", R), () => {
        window.removeEventListener("blur", R), window.removeEventListener("resize", R);
      };
    }, [P]);
    const [U, pe] = In((R) => {
      const B = j().filter((V) => !V.disabled), z = B.find((V) => V.ref.current === document.activeElement), $ = _n(B, R, z);
      $ && setTimeout(() => $.ref.current.focus());
    }), Pe = a.useCallback(
      (R, B, z) => {
        const $ = !H.current && !z;
        (w.value !== void 0 && w.value === B || $) && (k(R), $ && (H.current = !0));
      },
      [w.value]
    ), Ee = a.useCallback(() => S?.focus(), [S]), le = a.useCallback(
      (R, B, z) => {
        const $ = !H.current && !z;
        (w.value !== void 0 && w.value === B || $) && M(R);
      },
      [w.value]
    ), ye = o === "popper" ? et : mn, me = ye === et ? {
      side: l,
      sideOffset: c,
      align: f,
      alignOffset: d,
      arrowPadding: u,
      collisionBoundary: x,
      collisionPadding: m,
      sticky: g,
      hideWhenDetached: p,
      avoidCollisions: y
    } : {};
    return /* @__PURE__ */ h.jsx(
      un,
      {
        scope: n,
        content: S,
        viewport: C,
        onViewportChange: N,
        itemRefCallback: Pe,
        selectedItem: I,
        onItemLeave: Ee,
        itemTextRefCallback: le,
        focusSelectedItem: O,
        selectedItemText: D,
        position: o,
        isPositioned: _,
        searchRef: U,
        children: /* @__PURE__ */ h.jsx(Xn, { as: fi, allowPinchZoom: !0, children: /* @__PURE__ */ h.jsx(
          Gn,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (R) => {
              R.preventDefault();
            },
            onUnmountAutoFocus: F(r, (R) => {
              w.trigger?.focus({ preventScroll: !0 }), R.preventDefault();
            }),
            children: /* @__PURE__ */ h.jsx(
              Zn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: s,
                onFocusOutside: (R) => R.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ h.jsx(
                  ye,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (R) => R.preventDefault(),
                    ...v,
                    ...me,
                    onPlaced: () => T(!0),
                    ref: E,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...v.style
                    },
                    onKeyDown: F(v.onKeyDown, (R) => {
                      const B = R.ctrlKey || R.altKey || R.metaKey;
                      if (R.key === "Tab" && R.preventDefault(), !B && R.key.length === 1 && pe(R.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(R.key)) {
                        let $ = j().filter((V) => !V.disabled).map((V) => V.ref.current);
                        if (["ArrowUp", "End"].includes(R.key) && ($ = $.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(R.key)) {
                          const V = R.target, W = $.indexOf(V);
                          $ = $.slice(W + 1);
                        }
                        setTimeout(() => A($)), R.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
pn.displayName = ai;
var di = "SelectItemAlignedPosition", mn = a.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: o, ...r } = e, i = de(xe, n), s = ue(xe, n), [l, c] = a.useState(null), [f, d] = a.useState(null), u = Z(t, (E) => d(E)), x = ze(n), m = a.useRef(!1), g = a.useRef(!0), { viewport: p, selectedItem: y, selectedItemText: v, focusSelectedItem: w } = s, S = a.useCallback(() => {
    if (i.trigger && i.valueNode && l && f && p && y && v) {
      const E = i.trigger.getBoundingClientRect(), I = f.getBoundingClientRect(), k = i.valueNode.getBoundingClientRect(), D = v.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const V = D.left - I.left, W = k.left - V, G = E.left - W, he = E.width + G, Ke = Math.max(he, I.width), Ye = window.innerWidth - q, Xe = wt(W, [
          q,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(q, Ye - Ke)
        ]);
        l.style.minWidth = he + "px", l.style.left = Xe + "px";
      } else {
        const V = I.right - D.right, W = window.innerWidth - k.right - V, G = window.innerWidth - E.right - W, he = E.width + G, Ke = Math.max(he, I.width), Ye = window.innerWidth - q, Xe = wt(W, [
          q,
          Math.max(q, Ye - Ke)
        ]);
        l.style.minWidth = he + "px", l.style.right = Xe + "px";
      }
      const M = x(), j = window.innerHeight - q * 2, _ = p.scrollHeight, T = window.getComputedStyle(f), H = parseInt(T.borderTopWidth, 10), A = parseInt(T.paddingTop, 10), O = parseInt(T.borderBottomWidth, 10), P = parseInt(T.paddingBottom, 10), L = H + A + _ + P + O, U = Math.min(y.offsetHeight * 5, L), pe = window.getComputedStyle(p), Pe = parseInt(pe.paddingTop, 10), Ee = parseInt(pe.paddingBottom, 10), le = E.top + E.height / 2 - q, ye = j - le, me = y.offsetHeight / 2, R = y.offsetTop + me, B = H + A + R, z = L - B;
      if (B <= le) {
        const V = M.length > 0 && y === M[M.length - 1].ref.current;
        l.style.bottom = "0px";
        const W = f.clientHeight - p.offsetTop - p.offsetHeight, G = Math.max(
          ye,
          me + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (V ? Ee : 0) + W + O
        ), he = B + G;
        l.style.height = he + "px";
      } else {
        const V = M.length > 0 && y === M[0].ref.current;
        l.style.top = "0px";
        const G = Math.max(
          le,
          H + p.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (V ? Pe : 0) + me
        ) + z;
        l.style.height = G + "px", p.scrollTop = B - le + p.offsetTop;
      }
      l.style.margin = `${q}px 0`, l.style.minHeight = U + "px", l.style.maxHeight = j + "px", o?.(), requestAnimationFrame(() => m.current = !0);
    }
  }, [
    x,
    i.trigger,
    i.valueNode,
    l,
    f,
    p,
    y,
    v,
    i.dir,
    o
  ]);
  ne(() => S(), [S]);
  const [b, C] = a.useState();
  ne(() => {
    f && C(window.getComputedStyle(f).zIndex);
  }, [f]);
  const N = a.useCallback(
    (E) => {
      E && g.current === !0 && (S(), w?.(), g.current = !1);
    },
    [S, w]
  );
  return /* @__PURE__ */ h.jsx(
    pi,
    {
      scope: n,
      contentWrapper: l,
      shouldExpandOnScrollRef: m,
      onScrollButtonChange: N,
      children: /* @__PURE__ */ h.jsx(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: b
          },
          children: /* @__PURE__ */ h.jsx(
            X.div,
            {
              ...r,
              ref: u,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...r.style
              }
            }
          )
        }
      )
    }
  );
});
mn.displayName = di;
var ui = "SelectPopperPosition", et = a.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: o = "start",
    collisionPadding: r = q,
    ...i
  } = e, s = Ue(n);
  return /* @__PURE__ */ h.jsx(
    $r,
    {
      ...s,
      ...i,
      ref: t,
      align: o,
      collisionPadding: r,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...i.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
et.displayName = ui;
var [pi, ht] = Re(xe, {}), tt = "SelectViewport", hn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: o, ...r } = e, i = ue(tt, n), s = ht(tt, n), l = Z(t, i.onViewportChange), c = a.useRef(0);
    return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
      /* @__PURE__ */ h.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ h.jsx(Fe.Slot, { scope: n, children: /* @__PURE__ */ h.jsx(
        X.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: l,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...r.style
          },
          onScroll: F(r.onScroll, (f) => {
            const d = f.currentTarget, { contentWrapper: u, shouldExpandOnScrollRef: x } = s;
            if (x?.current && u) {
              const m = Math.abs(c.current - d.scrollTop);
              if (m > 0) {
                const g = window.innerHeight - q * 2, p = parseFloat(u.style.minHeight), y = parseFloat(u.style.height), v = Math.max(p, y);
                if (v < g) {
                  const w = v + m, S = Math.min(g, w), b = w - S;
                  u.style.height = S + "px", u.style.bottom === "0px" && (d.scrollTop = b > 0 ? b : 0, u.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = d.scrollTop;
          })
        }
      ) })
    ] });
  }
);
hn.displayName = tt;
var gn = "SelectGroup", [mi, hi] = Re(gn), wn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = st();
    return /* @__PURE__ */ h.jsx(mi, { scope: n, id: r, children: /* @__PURE__ */ h.jsx(X.div, { role: "group", "aria-labelledby": r, ...o, ref: t }) });
  }
);
wn.displayName = gn;
var xn = "SelectLabel", yn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = hi(xn, n);
    return /* @__PURE__ */ h.jsx(X.div, { id: r.id, ...o, ref: t });
  }
);
yn.displayName = xn;
var $e = "SelectItem", [gi, vn] = Re($e), Sn = a.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: o,
      disabled: r = !1,
      textValue: i,
      ...s
    } = e, l = de($e, n), c = ue($e, n), f = l.value === o, [d, u] = a.useState(i ?? ""), [x, m] = a.useState(!1), g = Z(
      t,
      (w) => c.itemRefCallback?.(w, o, r)
    ), p = st(), y = a.useRef("touch"), v = () => {
      r || (l.onValueChange(o), l.onOpenChange(!1));
    };
    if (o === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ h.jsx(
      gi,
      {
        scope: n,
        value: o,
        disabled: r,
        textId: p,
        isSelected: f,
        onItemTextChange: a.useCallback((w) => {
          u((S) => S || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ h.jsx(
          Fe.ItemSlot,
          {
            scope: n,
            value: o,
            disabled: r,
            textValue: d,
            children: /* @__PURE__ */ h.jsx(
              X.div,
              {
                role: "option",
                "aria-labelledby": p,
                "data-highlighted": x ? "" : void 0,
                "aria-selected": f && x,
                "data-state": f ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...s,
                ref: g,
                onFocus: F(s.onFocus, () => m(!0)),
                onBlur: F(s.onBlur, () => m(!1)),
                onClick: F(s.onClick, () => {
                  y.current !== "mouse" && v();
                }),
                onPointerUp: F(s.onPointerUp, () => {
                  y.current === "mouse" && v();
                }),
                onPointerDown: F(s.onPointerDown, (w) => {
                  y.current = w.pointerType;
                }),
                onPointerMove: F(s.onPointerMove, (w) => {
                  y.current = w.pointerType, r ? c.onItemLeave?.() : y.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: F(s.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: F(s.onKeyDown, (w) => {
                  c.searchRef?.current !== "" && w.key === " " || (ni.includes(w.key) && v(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Sn.displayName = $e;
var Ae = "SelectItemText", Cn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: o, style: r, ...i } = e, s = de(Ae, n), l = ue(Ae, n), c = vn(Ae, n), f = si(Ae, n), [d, u] = a.useState(null), x = Z(
      t,
      (v) => u(v),
      c.onItemTextChange,
      (v) => l.itemTextRefCallback?.(v, c.value, c.disabled)
    ), m = d?.textContent, g = a.useMemo(
      () => /* @__PURE__ */ h.jsx("option", { value: c.value, disabled: c.disabled, children: m }, c.value),
      [c.disabled, c.value, m]
    ), { onNativeOptionAdd: p, onNativeOptionRemove: y } = f;
    return ne(() => (p(g), () => y(g)), [p, y, g]), /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
      /* @__PURE__ */ h.jsx(X.span, { id: c.textId, ...i, ref: x }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? it.createPortal(i.children, s.valueNode) : null
    ] });
  }
);
Cn.displayName = Ae;
var bn = "SelectItemIndicator", Rn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return vn(bn, n).isSelected ? /* @__PURE__ */ h.jsx(X.span, { "aria-hidden": !0, ...o, ref: t }) : null;
  }
);
Rn.displayName = bn;
var nt = "SelectScrollUpButton", Pn = a.forwardRef((e, t) => {
  const n = ue(nt, e.__scopeSelect), o = ht(nt, e.__scopeSelect), [r, i] = a.useState(!1), s = Z(t, o.onScrollButtonChange);
  return ne(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const f = c.scrollTop > 0;
        i(f);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ h.jsx(
    An,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Pn.displayName = nt;
var ot = "SelectScrollDownButton", En = a.forwardRef((e, t) => {
  const n = ue(ot, e.__scopeSelect), o = ht(ot, e.__scopeSelect), [r, i] = a.useState(!1), s = Z(t, o.onScrollButtonChange);
  return ne(() => {
    if (n.viewport && n.isPositioned) {
      let l = function() {
        const f = c.scrollHeight - c.clientHeight, d = Math.ceil(c.scrollTop) < f;
        i(d);
      };
      const c = n.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ h.jsx(
    An,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = n;
        l && c && (l.scrollTop = l.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
En.displayName = ot;
var An = a.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: o, ...r } = e, i = ue("SelectScrollButton", n), s = a.useRef(null), l = ze(n), c = a.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return a.useEffect(() => () => c(), [c]), ne(() => {
    l().find((d) => d.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [l]), /* @__PURE__ */ h.jsx(
    X.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: F(r.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(o, 50));
      }),
      onPointerMove: F(r.onPointerMove, () => {
        i.onItemLeave?.(), s.current === null && (s.current = window.setInterval(o, 50));
      }),
      onPointerLeave: F(r.onPointerLeave, () => {
        c();
      })
    }
  );
}), wi = "SelectSeparator", Tn = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e;
    return /* @__PURE__ */ h.jsx(X.div, { "aria-hidden": !0, ...o, ref: t });
  }
);
Tn.displayName = wi;
var rt = "SelectArrow", xi = a.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...o } = e, r = Ue(n), i = de(rt, n), s = ue(rt, n);
    return i.open && s.position === "popper" ? /* @__PURE__ */ h.jsx(Vr, { ...r, ...o, ref: t }) : null;
  }
);
xi.displayName = rt;
var yi = "SelectBubbleInput", Nn = a.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, o) => {
    const r = a.useRef(null), i = Z(o, r), s = Jn(t);
    return a.useEffect(() => {
      const l = r.current;
      if (!l) return;
      const c = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && d) {
        const u = new Event("change", { bubbles: !0 });
        d.call(l, t), l.dispatchEvent(u);
      }
    }, [s, t]), /* @__PURE__ */ h.jsx(
      X.select,
      {
        ...n,
        style: { ...nn, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
Nn.displayName = yi;
function On(e) {
  return e === "" || e === void 0;
}
function In(e) {
  const t = Ot(e), n = a.useRef(""), o = a.useRef(0), r = a.useCallback(
    (s) => {
      const l = n.current + s;
      t(l), (function c(f) {
        n.current = f, window.clearTimeout(o.current), f !== "" && (o.current = window.setTimeout(() => c(""), 1e3));
      })(l);
    },
    [t]
  ), i = a.useCallback(() => {
    n.current = "", window.clearTimeout(o.current);
  }, []);
  return a.useEffect(() => () => window.clearTimeout(o.current), []), [n, r, i];
}
function _n(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = vi(e, Math.max(i, 0));
  r.length === 1 && (s = s.filter((f) => f !== n));
  const c = s.find(
    (f) => f.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function vi(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
var Si = on, Dn = sn, Ci = cn, bi = an, Ri = fn, Mn = dn, Pi = hn, Ei = wn, jn = yn, Ln = Sn, Ai = Cn, Ti = Rn, $n = Pn, Vn = En, kn = Tn;
const zi = Si, Ui = Ei, Ki = Ci, Ni = a.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ h.jsxs(
  Dn,
  {
    ref: o,
    className: ce(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ h.jsx(bi, { asChild: !0, children: /* @__PURE__ */ h.jsx(It, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
Ni.displayName = Dn.displayName;
const Hn = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h.jsx(
  $n,
  {
    ref: n,
    className: ce(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ h.jsx(Qn, { className: "h-4 w-4" })
  }
));
Hn.displayName = $n.displayName;
const Bn = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h.jsx(
  Vn,
  {
    ref: n,
    className: ce(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ h.jsx(It, { className: "h-4 w-4" })
  }
));
Bn.displayName = Vn.displayName;
const Oi = a.forwardRef(({ className: e, children: t, position: n = "popper", ...o }, r) => /* @__PURE__ */ h.jsx(Ri, { children: /* @__PURE__ */ h.jsxs(
  Mn,
  {
    ref: r,
    className: ce(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: n,
    ...o,
    children: [
      /* @__PURE__ */ h.jsx(Hn, {}),
      /* @__PURE__ */ h.jsx(
        Pi,
        {
          className: ce(
            "p-1",
            n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ h.jsx(Bn, {})
    ]
  }
) }));
Oi.displayName = Mn.displayName;
const Ii = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h.jsx(
  jn,
  {
    ref: n,
    className: ce("px-2 py-1.5 text-sm font-semibold", e),
    ...t
  }
));
Ii.displayName = jn.displayName;
const _i = a.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ h.jsxs(
  Ln,
  {
    ref: o,
    className: ce(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ h.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ h.jsx(Ti, { children: /* @__PURE__ */ h.jsx(eo, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ h.jsx(Ai, { children: t })
    ]
  }
));
_i.displayName = Ln.displayName;
const Di = a.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h.jsx(
  kn,
  {
    ref: n,
    className: ce("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
Di.displayName = kn.displayName;
export {
  zi as Select,
  Oi as SelectContent,
  Ui as SelectGroup,
  _i as SelectItem,
  Ii as SelectLabel,
  Bn as SelectScrollDownButton,
  Hn as SelectScrollUpButton,
  Di as SelectSeparator,
  Ni as SelectTrigger,
  Ki as SelectValue
};
