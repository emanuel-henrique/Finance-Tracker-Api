import { Router } from "express";
import { sessionsController } from "../Controllers/sessionsController.js";

const session = new sessionsController();
const sessionsRoutes = Router();

sessionsRoutes.post("/", session.Create);

export { sessionsRoutes };
