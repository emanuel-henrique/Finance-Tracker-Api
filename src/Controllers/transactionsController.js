import { prisma } from "../../lib/prisma.js";
import { appError } from "../Utils/AppError.js";

const VALID_TYPES_VALUES = ["Receita", "Despesa"];

class transactionsController {
  async Index(req, res) {
    const { type, title } = req.query;
    const user_id = req.user.id;

    if (!user_id) {
      throw new appError("ID do usuário é obrigatório.", 400);
    }

    if (type && !VALID_TYPES_VALUES.includes(type)) {
      throw new appError("Tipo de transação inválido.", 400);
    }

    const transactionsOwner = await prisma.user.findUnique({
      where: {
        id: Number(user_id),
      },
    });

    if (!transactionsOwner) {
      throw new appError("Usuário não encontrado.", 404);
    }

    const transactionsList = await prisma.transaction.findMany({
      where: {
        userId: Number(user_id),
        ...(type && { type }),
        ...(title && {
          title: {
            contains: title,
          },
        }),
      },
      orderBy: {
        date: "desc", // ← Ordenar pela data da transação, não pela criação
      },
    });

    return res.status(200).json(transactionsList);
  }

  async Create(req, res) {
    const {
      title,
      description = "Transação sem descrição.",
      amount,
      type = "Receita",
      date, // ← Adicionar o campo date
    } = req.body;
    const user_id = req.user.id;

    const userExists = await prisma.user.findUnique({
      where: { id: Number(user_id) },
    });

    if (!userExists) {
      throw new appError("Usuário não encontrado.", 404);
    }

    if (!title) {
      throw new appError("Informe o título da transação.");
    }

    if (!amount || amount <= 0) {
      throw new appError("Informe o valor da transação.");
    }

    if (!date) {
      throw new appError("Informe a data da transação.");
    }

    if (type && !VALID_TYPES_VALUES.includes(type)) {
      throw new appError("Selecione um tipo de transação válido!");
    }

    const transaction = await prisma.transaction.create({
      data: {
        title: title,
        description: description,
        amount: Number(amount),
        type: type,
        date: new Date(date), // ← Converter string para Date
        userId: Number(user_id),
      },
    });

    return res.status(201).json(transaction);
  }

  async Show(req, res) {
    const { transaction_id } = req.params;

    const transactionToShow = await prisma.transaction.findUnique({
      where: {
        id: Number(transaction_id),
      },
    });

    if (!transactionToShow) {
      throw new appError("Transação não encontrada", 404);
    }

    return res.status(200).json(transactionToShow);
  }

  async Delete(req, res) {
    const { transaction_id } = req.params;

    try {
      await prisma.transaction.delete({
        where: {
          id: Number(transaction_id),
        },
      });

      return res.status(200).json();
    } catch (error) {
      throw new appError("Transação não encontrada.", 404);
    }
  }

  async Update(req, res) {
    const { title, description, amount, type, date } = req.body; // ← Adicionar date
    const { transaction_id } = req.params;

    const transactionToUpdate = await prisma.transaction.findUnique({
      where: {
        id: Number(transaction_id),
      },
    });

    if (!transactionToUpdate) {
      throw new appError("Transação não encontrada", 404);
    }

    if (!title) {
      throw new appError("Informe o título da transação.");
    }

    if (!description) {
      throw new appError("Informe a descrição da transação.");
    }

    if (!amount || amount <= 0) {
      throw new appError("Informe um valor válido para a transação.");
    }

    if (date && isNaN(new Date(date).getTime())) {
      throw new appError("Informe uma data válida.");
    }

    if (type && !VALID_TYPES_VALUES.includes(type)) {
      throw new appError("Selecione um tipo de transação válido!");
    }

    const updatedTransactions = await prisma.transaction.update({
      where: {
        id: Number(transaction_id),
      },
      data: {
        title: title,
        description: description,
        amount: Number(amount),
        type: type,
        ...(date && { date: new Date(date) }), // ← Atualizar data se fornecida
      },
    });

    return res.status(200).json(updatedTransactions);
  }
}

export { transactionsController };
