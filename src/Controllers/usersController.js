import { prisma } from "../../lib/prisma.js";
import { hash, compare } from "bcryptjs";
import { appError } from "../Utils/AppError.js";

class UsersController {
  async Create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new appError("Preencha todos os campos!");
    }

    const checkIfUserExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkIfUserExists) {
      throw new appError("Este email já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  }

  async Update(req, res) {
    const { name, email, old_password, password } = req.body;
    const user_id = req.user.id;

    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: Number(user_id),
      },
    });

    if (!userToUpdate) {
      throw new appError("Usuário inexistente", 404);
    }

    // SEMPRE exigir senha antiga para qualquer alteração
    if (!old_password) {
      throw new appError(
        "Informe sua senha atual para confirmar as alterações."
      );
    }

    const checkIfOldPasswordIsCorrect = await compare(
      old_password,
      userToUpdate.password
    );

    if (!checkIfOldPasswordIsCorrect) {
      throw new appError("Senha antiga incorreta!", 401);
    }

    // Validar email duplicado se estiver mudando
    if (email && email !== userToUpdate.email) {
      const checkIfEmailIsInUse = await prisma.user.findUnique({
        where: { email },
      });

      if (checkIfEmailIsInUse) {
        throw new appError("Este e-mail já está em uso.");
      }
    }

    let newPasswordHashed = userToUpdate.password;

    if (password) {
      newPasswordHashed = await hash(password, 8);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(user_id) },
      data: {
        name: name ?? userToUpdate.name,
        email: email ?? userToUpdate.email,
        password: newPasswordHashed,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.status(200).json(userWithoutPassword);
  }
}

export { UsersController };
