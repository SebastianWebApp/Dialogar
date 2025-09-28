import { Crud_Chats } from "../Services/chats.service.js";
import logger from "../Services/logs.service.js";
export class Chats {
    constructor() {
        // Inicializamos el método para que pueda ser llamado a futuro
        this.chatsService = new Crud_Chats();
        // Creamos un nuevo chat
        this.createChats = async (req, res) => {
            try {
                const { User, Messages } = req.body;
                const process = await this.chatsService.Create(User, Messages);
                if (process.state) {
                    return res.status(200).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process.content,
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
        // Leemos los mensajes
        this.readMessages = async (req, res) => {
            try {
                const { Id, Page } = req.params;
                const process = await this.chatsService.Read(Id, Page);
                if (process.state) {
                    return res.status(200).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process.content,
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
        // Creamos un nuevo mensaje
        this.updateChats = async (req, res) => {
            try {
                const { Id, Messages } = req.body;
                const process = await this.chatsService.Update(Id, Messages);
                if (process.state) {
                    return res.status(200).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process.content,
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
        // Eliminamos un mensaje
        this.delete_Messages = async (req, res) => {
            try {
                const { Id, Id_Message } = req.body;
                const process = await this.chatsService.Delete_Message(Id, Id_Message);
                if (process.state) {
                    return res.status(200).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process.content,
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
        // Eliminamos un mensaje
        this.delete_Chat = async (req, res) => {
            try {
                const { Id } = req.params;
                const process = await this.chatsService.Delete_Chat(Id);
                if (process.state) {
                    return res.status(200).json({
                        content: process.content,
                        state: true,
                    });
                }
                else {
                    return res.status(400).json({
                        content: process.content,
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
