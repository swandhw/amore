import { setupServer as r } from "msw/node";
import { handlers as e } from "./handlers.js";
const m = r(...e);
export {
  m as server
};
