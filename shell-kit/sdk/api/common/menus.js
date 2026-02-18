import e from "../httpClient.js";
const a = async () => (await e.get("/pages")).data;
export {
  a as fetchAccessiblePages
};
