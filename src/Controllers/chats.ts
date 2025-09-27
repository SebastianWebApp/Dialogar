import { Crud_Chats } from "../Services/chats.service.ts";
import { Request, Response } from "express";
import logger from "../Services/logs.service.ts";

export class Chats {
  // Inicializamos el método para que pueda ser llamado a futuro
  private chatsService = new Crud_Chats();

  // Creamos un nuevo chat
  createChats = async (req: Request, res: Response) => {
    try {
      const { User, Messages } = req.body;

      const process = await this.chatsService.Create(User, Messages);

      if (process.state) {
        return res.status(200).json({
          content: process.content,
          state: true,
        });
      } else {
        return res.status(400).json({
          content: process.content,
          state: false,
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        content: "Error al realizar el proceso, intente de nuevo",
        state: false,
      });
    }
  };

  // Leemos los mensajes
  readMessages = async (req: Request, res: Response) => {
    try {
      const { Id, Page } = req.params;

      const process = await this.chatsService.Read(Id, Page);

      if (process.state) {
        return res.status(200).json({
          content: process.content,
          state: true,
        });
      } else {
        return res.status(400).json({
          content: process.content,
          state: false,
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        content: "Error al realizar el proceso, intente de nuevo",
        state: false,
      });
    }
  };

  // Creamos un nuevo mensaje
  updateChats = async (req: Request, res: Response) => {
    try {
      const { Id, Messages } = req.body;

      const process = await this.chatsService.Update(Id, Messages);

      if (process.state) {
        return res.status(200).json({
          content: process.content,
          state: true,
        });
      } else {
        return res.status(400).json({
          content: process.content,
          state: false,
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        content: "Error al realizar el proceso, intente de nuevo",
        state: false,
      });
    }
  };

  // Eliminamos un mensaje
  delete_Messages = async (req: Request, res: Response) => {
    try {
      const { Id, Id_Message } = req.body;

      const process = await this.chatsService.Delete_Message(Id, Id_Message);

      if (process.state) {
        return res.status(200).json({
          content: process.content,
          state: true,
        });
      } else {
        return res.status(400).json({
          content: process.content,
          state: false,
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        content: "Error al realizar el proceso, intente de nuevo",
        state: false,
      });
    }
  };

  // Eliminamos un mensaje
  delete_Chat = async (req: Request, res: Response) => {
    try {
      const { Id } = req.params;

      const process = await this.chatsService.Delete_Chat(Id);

      if (process.state) {
        return res.status(200).json({
          content: process.content,
          state: true,
        });
      } else {
        return res.status(400).json({
          content: process.content,
          state: false,
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        content: "Error al realizar el proceso, intente de nuevo",
        state: false,
      });
    }
  };
}
