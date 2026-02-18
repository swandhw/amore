import { http as d, HttpResponse as r } from "msw";
const c = [
  {
    id: "admin-user",
    name: "Admin User",
    roles: ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"]
  },
  {
    id: "manager-user",
    name: "Manager User",
    roles: ["ROLE_MANAGER", "ROLE_USER"]
  },
  {
    id: "standard-user",
    name: "Standard User",
    roles: ["ROLE_USER"]
  }
], i = "refreshToken", o = /* @__PURE__ */ new Map(), f = (t) => `mock-access-token-${t.id}-${Date.now()}`, h = () => `mock-refresh-token-${Math.random().toString(36).substring(7)}`, p = [
  // --- Auth Handlers ---
  d.post("/api/bff/auth/login", async ({ request: t }) => {
    const e = await t.json(), s = c.find((u) => u.id === e.userId);
    if (!s)
      return new r(null, { status: 401, statusText: "Unauthorized" });
    const n = f(s), a = h();
    return o.set(a, s.id), r.json(
      {
        accessToken: n,
        user: { id: s.id, name: s.name },
        roles: s.roles
      },
      {
        headers: {
          "Set-Cookie": `${i}=${a}; HttpOnly; Path=/api/bff; SameSite=Lax`
        }
      }
    );
  }),
  d.post("/api/bff/auth/refresh", ({ cookies: t }) => {
    const e = t[i];
    if (!e || !o.has(e))
      return new r(null, { status: 401, statusText: "Unauthorized" });
    const s = o.get(e), n = c.find((l) => l.id === s);
    if (!n)
      return new r(null, { status: 401, statusText: "Unauthorized" });
    o.delete(e);
    const a = h();
    o.set(a, s);
    const u = f(n);
    return r.json(
      {
        accessToken: u,
        user: { id: n.id, name: n.name },
        roles: n.roles
      },
      {
        headers: {
          "Set-Cookie": `${i}=${a}; HttpOnly; Path=/api/bff; SameSite=Lax`
        }
      }
    );
  }),
  d.post("/api/bff/auth/logout", ({ cookies: t }) => {
    const e = t[i];
    return e && o.delete(e), r.json(
      { success: !0 },
      {
        headers: {
          "Set-Cookie": `${i}=; HttpOnly; Path=/api/bff; Max-Age=0`
        }
      }
    );
  })
];
export {
  c as AUTH_USERS,
  p as authHandlers
};
