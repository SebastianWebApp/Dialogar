import { Mongo_User } from "../Config/user_db.ts";
import logger from "./logs.service.ts";
import {
  Encriptacion,
  Desencriptar,
} from "./encriptar_desencriptar.service.ts";

export class User_Crud {
  /**
   * Crea un nuevo usuario en la base de datos.
   * Encripta el teléfono y la contraseña antes de guardar.
   * Verifica que el teléfono no esté registrado previamente.
   * @param Name - Nombre del usuario
   * @param Password - Contraseña del usuario
   * @param Phone - Teléfono del usuario
   * @param Avatar - Avatar del usuario
   * @returns Estado y mensaje del proceso
   */

  async Create(Name: string, Password: string, Phone: string, Avatar: string) {
    try {
      const Phone_Encriptado = await Encriptacion(Phone);
      const Password_Encriptado = await Encriptacion(Password);

      if (!Phone_Encriptado.state) {
        logger.error(Phone_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }
      if (!Password_Encriptado.state) {
        logger.error(Password_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }

      const existingUser = await Mongo_User.findOne({
        Phone: Phone_Encriptado.content,
      });
      if (existingUser) {
        logger.info("El teléfono ya está registrado");

        return { state: false, content: "El teléfono ya está registrado" };
      }

      const process = await Mongo_User.create({
        Name,
        Password: Password_Encriptado.content,
        Phone: Phone_Encriptado.content,
        Avatar,
      });

      logger.info("Usuario creado correctamente");

      return {
        state: true,
        content: process._id,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al crear el usuario",
      };
    }
  }

  /**
   * Actualiza los datos de un usuario existente.
   * Encripta el teléfono y la contraseña antes de actualizar.
   * Verifica que el teléfono no esté registrado por otro usuario.
   * @param Id - ID del usuario
   * @param Name - Nombre del usuario
   * @param Password - Contraseña del usuario
   * @param Phone - Teléfono del usuario
   * @param Avatar - Avatar del usuario
   * @returns Estado y mensaje del proceso
   */

  async Update(
    Id: string,
    Name: string,
    Password: string,
    Phone: string,
    Avatar: string
  ) {
    try {
      const Phone_Encriptado = await Encriptacion(Phone);
      const Password_Encriptado = await Encriptacion(Password);

      if (!Phone_Encriptado.state) {
        logger.error(Phone_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }
      if (!Password_Encriptado.state) {
        logger.error(Password_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }

      const existingUser = await Mongo_User.findOne({
        Phone: Phone_Encriptado.content,
        _id: { $ne: Id }, // Excluye el usuario actual
      });
      if (existingUser) {
        logger.info("El teléfono ya está registrado");

        return { state: false, content: "El teléfono ya está registrado" };
      }

      const process = await Mongo_User.findByIdAndUpdate(
        Id,
        {
          Name,
          Password: Password_Encriptado.content,
          Phone: Phone_Encriptado.content,
          Avatar,
        },
        { new: true } // Devuelve el documento actualizado
      );

      if (!process) {
        logger.warn("Usuario no encontrado");
        return { state: false, content: "Usuario no encontrado" };
      }

      logger.info("Usuario actualizado correctamente");

      return {
        state: true,
        content: "Usuario actualizado correctamente",
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al actualizar el usuario",
      };
    }
  }

  /**
   * Obtiene el perfil completo de un usuario por su ID.
   * Desencripta el teléfono y la contraseña antes de devolver los datos.
   * @param Id - ID del usuario
   * @returns Estado y datos del usuario
   */

  async Read_Perfil(Id: string) {
    try {
      const process = await Mongo_User.findById(Id);

      if (!process) {
        logger.warn("Usuario no encontrado");
        return { state: false, content: "Usuario no encontrado" };
      }

      logger.info("Usuario encontrado");

      const Phone_Desencriptar = await Desencriptar(process.Phone);
      const Password_Desencriptar = await Desencriptar(process.Password);

      if (!Phone_Desencriptar.state) {
        logger.error(Phone_Desencriptar.content);
        return {
          state: false,
          content: "Error al desencriptar las credenciales",
        };
      }
      if (!Password_Desencriptar.state) {
        logger.error(Password_Desencriptar.content);
        return {
          state: false,
          content: "Error al desencriptar las credenciales",
        };
      }

      process.Phone = Phone_Desencriptar.content;
      process.Password = Password_Desencriptar.content;

      return {
        state: true,
        content: process,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al buscar usuario",
      };
    }
  }

  /**
   * Verifica las credenciales de un usuario (login).
   * Encripta el teléfono y la contraseña para comparar con la base de datos.
   * @param Password - Contraseña del usuario
   * @param Phone - Teléfono del usuario
   * @returns Estado y mensaje del proceso
   */

  async Read_Credenciales(Password: string, Phone: string) {
    try {
      const Phone_Encriptado = await Encriptacion(Phone);
      const Password_Encriptado = await Encriptacion(Password);

      if (!Phone_Encriptado.state) {
        logger.error(Phone_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }

      const process = await Mongo_User.findOne({
        Phone: Phone_Encriptado.content,
      });

      if (!process) {
        logger.warn("Usuario no encontrado");
        return { state: false, content: "Usuario no encontrado" };
      }

      // Comparamos la contraseña encriptada
      if (process.Password !== Password_Encriptado.content) {
        logger.warn("Contraseña incorrecta");
        return { state: false, content: "Contraseña incorrecta" };
      }

      logger.info("Credenciales correctas");

      return {
        state: true,
        content: process._id,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al leer usuario",
      };
    }
  }

  /**
   * Busca el perfil de un usuario por su número de teléfono.
   * Encripta el teléfono antes de buscar.
   * Devuelve solo el nombre y el avatar.
   * @param Phone - Teléfono del usuario
   * @returns Estado y datos del usuario
   */

  async Find_Perfil(Phone: string) {
    try {
      const Phone_Encriptado = await Encriptacion(Phone);

      if (!Phone_Encriptado.state) {
        logger.error(Phone_Encriptado.content);
        return {
          state: false,
          content: "Error al encriptar las credenciales",
        };
      }

      const process = await Mongo_User.findOne({
        Phone: Phone_Encriptado.content,
      }).select("Name Avatar"); // solo estos campos;

      if (!process) {
        logger.warn("Usuario no encontrado");
        return { state: false, content: "Usuario no encontrado" };
      }

      logger.info("Usuario encontrado");

      return {
        state: true,
        content: process,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al buscar usuario",
      };
    }
  }

  /**
   * Obtiene datos básicos del perfil de usuario por su ID.
   * Devuelve solo el nombre y el avatar.
   * @param Id - ID del usuario
   * @returns Estado y datos del usuario
   */

  async Data_Perfil(Id: string) {
    try {
      const process = await Mongo_User.findById(Id).select("Name Avatar -_id"); // solo estos campos;

      if (!process) {
        logger.warn("Usuario no encontrado");
        return { state: false, content: "Usuario no encontrado" };
      }

      logger.info("Usuario encontrado");

      return {
        state: true,
        content: process,
      };
    } catch (error) {
      logger.error(error);
      return {
        state: false,
        content: "Error al buscar usuario",
      };
    }
  }
}
