import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API de Dialoga",
        version: "1.0.0",
        description: "Documentación de la API de dialoga",
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Servidor local",
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ["./src/Routers/*.ts"], // Aquí busca los comentarios @swagger
};
export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
