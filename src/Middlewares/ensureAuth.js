import jwt from "jsonwebtoken";
import { appError } from "../Utils/AppError.js";
import authConfig from "../Configs/auth.js";

function ensureAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new appError("JWT Token não informado.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = jwt.verify(token, authConfig.jwt.secret);
    req.user = {
      id: Number(user_id),
    };

    next();
  } catch (error) {
    throw new appError("JWT Token inválido.", 401);
  }
}
export { ensureAuthenticate };
