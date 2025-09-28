import { JWT } from "../Services/jwt.service.js";
import logger from "../Services/logs.service.js";
export class JWT_Controllers {
    constructor() {
        // Inicializamos el método para que pueda ser llamado a futuro
        this.jwtService = new JWT();
        this.Comprobar_JWT = async (req, res) => {
            try {
                const { Token } = req.body;
                const process_JWT = await this.jwtService.Leer_JWT(Token);
                if (process_JWT.state) {
                    return res.status(200).json({
                        content: process_JWT.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process_JWT.content,
                        state: false,
                    });
                }
            }
            catch (error) {
                logger.error(error);
                return res.status(500).json({
                    content: "Error al realizar el proceso, intente de nuevo",
                    state: false,
                });
            }
        };
    }
}
