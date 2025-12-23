import "express-async-error";
import express from "express";
import { Routes } from "./Routes/index.js";
import { appError } from "./Utils/AppError.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);

app.use((error, req, res, next) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: "Error",
    message: "Internal server error",
  });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
}

// Exportar para Vercel (ES Module syntax)
export default app;
