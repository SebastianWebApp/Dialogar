import { Mongo_Chat } from "../Config/chats_db.js";
import { User_Crud } from "./user_crud.service.js";
import logger from "./logs.service.js";

export class Crud_Chats {
  // ----------------------
  // CREATE: Crear un nuevo chat
  // ----------------------

  async Create(User: Array<string>, Messages: Array<any> = []) {
    try {
      const chats = await Mongo_Chat.create({ User, Messages });

      const dato = {
        Chat_Id: chats._id,
        Messages: chats.Messages,
      };

      logger.info("Chat creado correctamente");
      return {
        state: true,
        content: dato,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al crear el mensaje",
      };
    }
  }

  // ----------------------
  // READ: Leemos los mensajes
  // ----------------------

  async Read(Id: string, Page: string) {
    try {
      const limit = 10;
      const skip = (parseInt(Page) - 1) * limit;

      const chats = await Mongo_Chat.findById(Id, {
        Messages: { $slice: [-skip - limit, limit] }, // toma los mensajes correctos desde el final
      });

      if (!chats) {
        logger.error("El id del chat no existe");

        return { state: false, content: "No existe ningún chat guardado" };
      }

      logger.info("Chat leído correctamente");
      return {
        state: true,
        content: chats,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al leer los mensajes",
      };
    }
  }

  // ----------------------
  // ReadByUser: Leemos los chats
  //

  async ReadByUser(Id: string) {
    try {
      const userService = new User_Crud();

      // Busca todos los chats donde el usuario está incluido
      const chats = await Mongo_Chat.find(
        { User: Id },
        { User: 1, Messages: { $slice: -1 } }
      );

      if (!chats || chats.length === 0) {
        logger.error("No existen chats para este usuario");
        return {
          state: false,
          content: "No existe ningún chat con este usuario",
        };
      }

      // Mapeamos cada chat y traemos también el perfil de los otros usuarios
      const result = await Promise.all(
        chats.map(async (chat) => {
          const otherUsers = chat.User.filter((u: string) => u !== Id);

          // Usamos Data_Perfil para cada usuario
          const profiles = await Promise.all(
            otherUsers.map(async (otherId: string) => {
              const perfil = await userService.Data_Perfil(otherId);
              return perfil.state ? perfil.content : null;
            })
          );

          return {
            chatId: chat._id,
            otherUsers: profiles.filter((p) => p !== null), // quitamos los que no existen
            lastMessage: chat.Messages[0],
          };
        })
      );

      logger.info("Chats leídos correctamente");
      return {
        state: true,
        content: result,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al leer los mensajes",
      };
    }
  }

  // ----------------------
  // UPDATE: Agregar mensaje a un chat
  // ----------------------

  async Update(Id: string, Messages: Array<any> = []) {
    try {
      const chat_id = await Mongo_Chat.findById(Id);
      if (!chat_id) {
        logger.error("El id del chat no existe");

        return { state: false, content: "No existe ningún chat guardado" };
      }

      // Solo creamos un push en ese chat y le guardamos con save en la base
      chat_id.Messages.push(...Messages); // Usamos spread para agregar cada objeto individual
      await chat_id.save();

      // Obtenemos los mensajes recién agregados con su _id
      const newMessages = chat_id.Messages.slice(-Messages.length);

      logger.info("Mensaje creado correctamente");

      return {
        state: true,
        content: newMessages,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al crear el chat",
      };
    }
  }

  // ----------------------
  // Delete_Message: Eliminamos un mensaje
  // ----------------------

  async Delete_Message(Id: string, Id_Message: string) {
    try {
      const chat_id = await Mongo_Chat.findById(Id);
      if (!chat_id) {
        logger.error("El id del chat no existe");

        return { state: false, content: "No existe ningún chat guardado" };
      }

      await Mongo_Chat.updateOne(
        { _id: Id },
        { $pull: { Messages: { _id: Id_Message } } }
      );

      // $pull elimina del arreglo Messages solo el elemento que cumpla la condición.

      logger.info("Mensaje eliminado correctamente");

      return {
        state: true,
        content: "Mensaje eliminado correctamente",
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al eliminar el mensaje",
      };
    }
  }

  // ----------------------
  // Delete_Chat: Eliminar chat
  // ----------------------

  async Delete_Chat(Id: string) {
    try {
      const chat_id = await Mongo_Chat.findById(Id);
      if (!chat_id) {
        logger.error("El id del chat no existe");

        return { state: false, content: "No existe ningún chat guardado" };
      }

      await Mongo_Chat.findByIdAndDelete(Id);

      logger.info("Chat eliminado correctamente");

      return {
        state: true,
        content: "Chat eliminado correctamente",
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al eliminar el chat",
      };
    }
  }
}
