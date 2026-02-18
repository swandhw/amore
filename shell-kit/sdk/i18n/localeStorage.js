const e = "app.locale", t = () => localStorage.getItem(e), a = (o) => localStorage.setItem(e, o), c = () => localStorage.removeItem(e);
export {
  c as clearStoredLocale,
  t as getStoredLocale,
  a as setStoredLocale
};
