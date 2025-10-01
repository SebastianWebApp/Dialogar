import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./Services/logs.service.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

io.on("connection", (socket) => {
  logger.info(`Cliente con ID ${socket.id} conectado`);

  // Registrar usuario con try/catch
  socket.on("registrarUsuario", (userId) => {
    try {
      socket.join(userId);
      logger.info(`Usuario ${userId} unido a su sala`);
    } catch (error) {
      logger.error(`Error registrando usuario ${userId}: ${error}`);
    }
  });

  // Enviar mensaje con try/catch
  socket.on(
    "enviarMensaje",
    ({ destinatarioId, id_Chat, avatar, name, message, image }) => {
      try {
        io.to(destinatarioId).emit("recibirMensaje", {
          id_Chat,
          avatar,
          name,
          message,
          image,
        });
      } catch (error) {
        logger.error(`Error enviando mensaje a ${destinatarioId}: ${error}`);
      }
    }
  );

  socket.on("disconnect", () => {
    logger.info(`Cliente con ID ${socket.id} desconectado`);
  });
});

// Iniciar servidor con manejo de errores
try {
  server.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  logger.error(`Error iniciando el servidor: ${error}`);
}
