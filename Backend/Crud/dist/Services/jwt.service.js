import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logs.service.js";
dotenv.config();
const CLAVE_SECRETA_JWT = process.env.CLAVE_SECRETA_JWT;
export class JWT {
    async Crear_JWT(Id) {
        try {
            const payload = { id: Id };
            const token = jwt.sign(payload, CLAVE_SECRETA_JWT, { expiresIn: "1h" });
            logger.info("Token creado correctamente");
            return {
                state: true,
                content: token,
            };
        }
        catch (error) {
            logger.error(error);
            return {
                state: false,
                content: "Error al crear el token, intente de nuevo",
            };
        }
    }
    async Leer_JWT(token) {
        try {
            const decoded = jwt.verify(token, CLAVE_SECRETA_JWT);
            logger.info("Token leído correctamente");
            return {
                state: true,
                content: decoded.id, // solo el id
            };
        }
        catch (error) {
            logger.error(error);
            return {
                state: false,
                content: "Token inválido o expirado",
            };
        }
    }
}
