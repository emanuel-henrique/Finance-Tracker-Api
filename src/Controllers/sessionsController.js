import { appError } from "../Utils/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { compare } from "bcryptjs";
import authConfig from "../Configs/auth.js";
import jwt from "jsonwebtoken";

class sessionsController {
  async Create(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new appError("E-mail e/ou senha incorretos.", 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new appError("E-mail e/ou senha incorretos.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.status(200).json({ user, token });
  }
}

export { sessionsController };
