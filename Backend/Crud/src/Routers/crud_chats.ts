import { Router } from "express";
import { Chats } from "../Controllers/chats.js";
const router_crud_chats = Router();

const chatsController = new Chats();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Endpoints para gestionar los mensajes
 */
/**
 * @swagger
 * /api/crud_chats/Crear_Chat:
 *   post:
 *     summary: Crear un nuevo chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User:
 *                 type: array
 *                 items:
 *                   type: string
 *               Messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: Chat creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chat:
 *                   type: object
 *       400:
 *         description: Error en la creación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router_crud_chats.post("/Crear_Chat", chatsController.createChats);

/**
 * @swagger
 * /api/crud_chats/Leer_Mensajes/{Id}/{Page}:
 *   get:
 *     summary: Leer mensajes paginados de un chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chat
 *       - in: path
 *         name: Page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de página de los mensajes
 *     responses:
 *       200:
 *         description: Mensajes obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       sender:
 *                         type: string
 *                       content:
 *                         type: string
 *                       image:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Error al leer los mensajes
 */

router_crud_chats.get("/Leer_Mensajes/:Id/:Page", chatsController.readMessages);

/**
 * @swagger
 * /api/crud_chats/Actualizar_Mensajes:
 *   put:
 *     summary: Actualizar los mensajes
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               Messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                     content:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: Mensaje creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chat:
 *                   type: object
 *       400:
 *         description: Error en la creación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router_crud_chats.put("/Actualizar_Mensajes", chatsController.updateChats);

/**
 * @swagger
 * /api/crud_chats/Eliminar_Mensajes:
 *   delete:
 *     summary: Eliminar mensajes
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               Id_Message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chat:
 *                   type: object
 *       400:
 *         description: Error en la creación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router_crud_chats.delete("/Eliminar_Mensajes", chatsController.delete_Messages);

/**
 * @swagger
 * /api/crud_chats/Eliminar_Chat/{Id}:
 *   delete:
 *     summary: Eliminar chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Chat Eliminado
 *       400:
 *         description: Error al eliminar el chat
 */
router_crud_chats.delete("/Eliminar_Chat/:Id", chatsController.delete_Chat);

export default router_crud_chats;
