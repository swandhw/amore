function h(t) {
  const n = [];
  for (let e = 0; e < t; e++)
    n.push(Math.round(Math.random() * 100));
  return n;
}
function c(t) {
  const n = "US,Germany,UK,Korea,Italy,Greece".split(","), e = [], o = n.length;
  for (let r = 0; r < o; r++)
    e.push({
      id: r,
      country: n[r],
      active: Math.random() > 0.5,
      sales: Math.round(Math.random() * 1e4),
      trends: h(20)
    });
  return e;
}
function u(t, n, e) {
  return 100 - Math.round((t - n) / (e - n) * 100);
}
function g(t, n) {
  return '<div aria-label="' + n + '" style="width:100%;height:100%;box-sizing:border-box;padding:4px"><svg width="100%" height="100%" style="stroke:currentColor;color:#FFC107;"><g>' + t + "</g></svg></div>";
}
function d(t) {
  let n = "";
  const e = Math.min(...t), o = Math.max(...t);
  let r = 0, a = u(t[0], e, o);
  for (let s = 1; s < t.length; s++) {
    let i = Math.round(s / (t.length - 1) * 100), l = u(t[s], e, o);
    n += "<line x1=" + r + "% y1=" + a + "% x2=" + i + "% y2=" + l + "% />", r = i, a = l;
  }
  return g(n, "sparklines");
}
const x = c();
export {
  x as data,
  d as getSparklines
};
