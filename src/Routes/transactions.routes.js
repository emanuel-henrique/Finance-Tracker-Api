import { Router } from "express";
import { transactionsController } from "../Controllers/transactionsController.js";
import { ensureAuthenticate } from "../Middlewares/ensureAuth.js";

const transactionRouter = Router();
const transaction = new transactionsController();

transactionRouter.use(ensureAuthenticate);

transactionRouter.get("/", transaction.Index);
transactionRouter.post("/create", transaction.Create);
transactionRouter.put("/:transaction_id", transaction.Update);
transactionRouter.get("/:transaction_id", transaction.Show);
transactionRouter.delete("/:transaction_id", transaction.Delete);

export { transactionRouter };
