import { appError } from "../Utils/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { compare } from "bcryptjs";
import authConfig from "../Configs/auth.js";
import jwt from "jsonwebtoken";

class sessionsController {
  async Create(req, res) {
    const { email, password } = req.body;

    const userToAuth = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userToAuth) {
      throw new appError("E-mail e/ou senha incorretos.", 401);
    }

    const comparePassword = await compare(password, userToAuth.password);

    if (!comparePassword) {
      throw new appError("E-mail e/ou senha incorretos.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign({}, secret, {
      subject: String(userToAuth.id),
      expiresIn,
    });

    return res.status(200).json({
      user: {
        id: userToAuth.id,
        name: userToAuth.name,
        email: userToAuth.email,
      },
      token,
    });
  }
}

export { sessionsController };
