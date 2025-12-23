import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { transactionRouter } from "./transactions.routes.js";
import { sessionsRoutes } from "./sessions.routes.js";

const Routes = Router();
Routes.use("/users", userRouter);
Routes.use("/sessions", sessionsRoutes);
Routes.use("/transactions", transactionRouter);

export { Routes };
