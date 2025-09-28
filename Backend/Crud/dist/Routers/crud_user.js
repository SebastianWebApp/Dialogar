import { Router } from "express";
import { User } from "../Controllers/user.js";
const router_crud_user = Router();
const userController = new User();
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión de usuarios
 */
/**
 * @swagger
 * /api/crud_user/Crear_Usuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Password:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en la creación
 */
router_crud_user.post("/Crear_Usuario", userController.createUser);
/**
 * @swagger
 * /api/crud_user/Actualizar_Usuario:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: string
 *               Name:
 *                 type: string
 *               Password:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en la actualización
 */
router_crud_user.put("/Actualizar_Usuario", userController.updateUser);
/**
 * @swagger
 * /api/crud_user/Leer_Perfil/{Id}:
 *   get:
 *     summary: Leer el perfil de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Perfil encontrado
 *       400:
 *         description: Error al buscar el perfil
 */
router_crud_user.get("/Leer_Perfil/:Id", userController.readUser);
/**
 * @swagger
 * /api/crud_user/Credenciales_Usuario:
 *   post:
 *     summary: Validar credenciales de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Password:
 *                 type: string
 *               Phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Credenciales correctas
 *       400:
 *         description: Credenciales incorrectas
 */
router_crud_user.post("/Credenciales_Usuario", userController.credencialesUser);
/**
 * @swagger
 * /api/crud_user/Buscar_Usuario/{Phone}:
 *   get:
 *     summary: Buscar usuario por teléfono
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: Phone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Usuario encontrado
 *       400:
 *         description: Usuario no encontrado
 */
router_crud_user.get("/Buscar_Usuario/:Phone", userController.findUser);
/**
 * @swagger
 * /api/crud_user/Data_Usuario/{Id}:
 *   get:
 *     summary: Obtener datos básicos del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Datos encontrados
 *       400:
 *         description: Error al obtener datos
 */
router_crud_user.get("/Data_Usuario/:Id", userController.dataUser);
export default router_crud_user;
