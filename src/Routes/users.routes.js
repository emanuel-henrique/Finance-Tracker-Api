import { Router } from "express";
import { UsersController } from "../Controllers/usersController.js";
import { ensureAuthenticate } from "../Middlewares/ensureAuth.js";

const userRouter = Router();
const user = new UsersController();

userRouter.post("/create", user.Create);
userRouter.put("/update", ensureAuthenticate, user.Update);

export { userRouter };
