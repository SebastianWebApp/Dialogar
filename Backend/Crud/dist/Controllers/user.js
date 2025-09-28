import { User_Crud } from "../Services/user_crud.service.js";
import { JWT } from "../Services/jwt.service.js";
import logger from "../Services/logs.service.js";
export class User {
    constructor() {
        // Inicializamos el método para que pueda ser llamado a futuro
        this.userService = new User_Crud();
        this.jwtService = new JWT();
        // Creamos un nuevo usuario verificando que no exista ya ese numero de teléfono
        this.createUser = async (req, res) => {
            try {
                const { Name, Password, Phone, Avatar } = req.body;
                const process = await this.userService.Create(Name, Password, Phone, Avatar);
                if (!process.state) {
                    return res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
                const process_JWT = await this.jwtService.Crear_JWT(process.content);
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
        // Actualizamos el usuario verificando que no exista el numero de teléfono sin contar con ese id
        this.updateUser = async (req, res) => {
            try {
                const { Id, Name, Password, Phone, Avatar } = req.body;
                const process = await this.userService.Update(Id, Name, Password, Phone, Avatar);
                if (process.state) {
                    res.status(201).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({
                    content: "Error al realizar el proceso, intente de nuevo",
                    state: false,
                });
            }
        };
        // Leemos el perfil del usuario para poder editar el perfil
        this.readUser = async (req, res) => {
            try {
                const { Id } = req.params;
                const process = await this.userService.Read_Perfil(Id);
                if (process.state) {
                    res.status(201).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({
                    content: "Error al realizar el proceso, intente de nuevo",
                    state: false,
                });
            }
        };
        // Validamos que la contraseña y el teléfono sean los mismos
        this.credencialesUser = async (req, res) => {
            try {
                const { Password, Phone } = req.body;
                const process = await this.userService.Read_Credenciales(Password, Phone);
                if (!process.state) {
                    return res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
                const process_JWT = await this.jwtService.Crear_JWT(process.content);
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
        // Buscamos por numero de teléfono para que pueda aparecer el perfil
        this.findUser = async (req, res) => {
            try {
                const { Phone } = req.params;
                const process = await this.userService.Find_Perfil(Phone);
                if (process.state) {
                    res.status(201).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({
                    content: "Error al realizar el proceso, intente de nuevo",
                    state: false,
                });
            }
        };
        // Extraemos los datos del usuario para que se pueda ver en la conversación
        this.dataUser = async (req, res) => {
            try {
                const { Id } = req.params;
                const process = await this.userService.Data_Perfil(Id);
                if (process.state) {
                    res.status(201).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    res.status(400).json({
                        content: process.content,
                        state: false,
                    });
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json({
                    content: "Error al realizar el proceso, intente de nuevo",
                    state: false,
                });
            }
        };
    }
}
