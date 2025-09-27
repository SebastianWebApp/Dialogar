import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./swagger.ts"; // importa lo que creaste

import logger from "./Services/logs.service.ts";
import connectToDB from "./Database/conect.ts";
import router_crud_user from "./Routers/crud_user.ts";
import router_seguridad from "./Routers/seguridad.ts";
import router_crud_chats from "./Routers/crud_chats.ts";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
connectToDB();

// Middlewares
app.use(cors()); // Allows connection between Front and Backend
app.use(json({ limit: "10mb" })); // Parse JSON in requests
app.use(cookieParser()); // To parse cookies

// Api para crear usuarios
app.use("/api/crud_user", router_crud_user);
app.use("/api/seguridad", router_seguridad);
app.use("/api/crud_chats", router_crud_chats);

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Si no existe la ruta salta el error
app.use((req, res) => {
  res.status(400).json({
    state: false,
    content: "Incorrect API address",
  });
});

app.listen(PORT, () => {
  logger.info(`Server Active http://localhost:${PORT}`);
});
