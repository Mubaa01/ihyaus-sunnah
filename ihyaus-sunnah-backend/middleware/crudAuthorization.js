import { authorize } from "./authMiddleware.js";

export const authorizeCrud = authorize(["director", "admin"]);
