import dotenv from "dotenv";
import { createCipheriv, createDecipheriv } from "crypto"; // Importamos el módulo 'crypto' para cifrado y descifrado
import logger from "./logs.service.js";
dotenv.config();

// Generamos una clave secreta de 32 bytes para AES-256 (cifrado de 256 bits)
const ClaveSecreta = Buffer.from(process.env.CLAVE_SECRETA_CRYPTO!, "hex");
// Generamos un vector de inicialización (IV) de 16 bytes.
const IV = Buffer.from(process.env.IV_SECRETA_CRYPTO!, "hex");

export const Encriptacion = async (Texto: string) => {
  try {
    // Creamos un cifrador con el algoritmo AES-256-CBC, clave secreta y vector de inicialización
    const cifrador = createCipheriv("aes-256-cbc", ClaveSecreta, IV);

    // Ciframos el texto. 'utf8' indica el formato del texto original, y 'hex' el formato del resultado
    let encriptado = cifrador.update(Texto, "utf8", "hex");

    // Finalizamos el cifrado y añadimos cualquier dato restante al resultado
    encriptado += cifrador.final("hex");

    // Retornamos el texto cifrado junto con el IV necesario para descifrarlo después
    logger.info("Texto encriptado");
    return {
      state: true,
      content: encriptado,
    };
  } catch (error) {
    logger.error(error);
    return {
      state: false,
      content: "Error al encriptar los datos",
    };
  }
};

export const Desencriptar = async (Texto: string) => {
  try {
    // Creamos un descifrador con el mismo algoritmo, clave secreta y el IV usado en el cifrado
    const descifrador = createDecipheriv(
      "aes-256-cbc", // Algoritmo usado (AES-256-CBC)
      ClaveSecreta, // Clave secreta para descifrar
      IV // Convertimos el IV desde formato hexadecimal a un buffer
    );

    // Desciframos el texto. 'hex' indica el formato del texto cifrado, y 'utf8' el formato del texto original
    let desencriptado = descifrador.update(Texto, "hex", "utf8");

    // Finalizamos el descifrado y añadimos cualquier dato restante al resultado
    desencriptado += descifrador.final("utf8");

    // Retornamos el texto original descifrado
    logger.info("Texto desencriptado");
    return {
      state: true,
      content: desencriptado,
    };
  } catch (error) {
    logger.error(error);

    return {
      state: false,
      content: "Error al desencriptar los datos",
    };
  }
};
