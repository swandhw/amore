import { setupWorker as r } from "msw/browser";
import { handlers as o } from "./handlers.js";
const m = r(...o);
export {
  m as worker
};
