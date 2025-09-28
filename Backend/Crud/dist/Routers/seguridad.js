import { Router } from "express";
import { JWT_Controllers } from "../Controllers/jwt.controllers.js";
const router_seguridad = Router();
const jwtController = new JWT_Controllers();
/**
 * @swagger
 * tags:
 *   name: Seguridad
 *   description: Endpoints para validar token de JWT
 */
/**
 * @swagger
 * /api/seguridad/Validar_JWT:
 *   post:
 *     summary: Validar Token
 *     tags: [Seguridad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Token:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Token valido
 *       400:
 *         description: Token invalido
 */
router_seguridad.post("/Validar_JWT", jwtController.Comprobar_JWT);
export default router_seguridad;
