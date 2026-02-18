const t = (a) => a.fields.reduce(
  (l, e) => ({
    ...l,
    [e.id]: e.defaultValue ?? ""
  }),
  {}
), d = (a, l) => a.fields.map((e) => ({
  id: e.id,
  label: e.label,
  type: e.type,
  value: l[e.id] ?? ""
}));
export {
  d as buildSearchFieldValues,
  t as createSearchFieldValueState
};
