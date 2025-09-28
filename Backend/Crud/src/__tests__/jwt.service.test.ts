import { JWT } from "../Services/jwt.service.js";
import jwtLib from "jsonwebtoken";

describe("JWT Service", () => {
  let jwt: JWT;

  // Se ejecuta antes de cada test: crea una nueva instancia y limpia los mocks
  beforeEach(() => {
    jwt = new JWT();
    jest.clearAllMocks();
  });

  // ---------------------------
  // Tests para crear Token
  // ---------------------------
  describe("Crear Token", () => {
    it("debe crear un token correctamente", async () => {
      const result = await jwt.Crear_JWT("Id");

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBeDefined(); // Solo verificamos que algo devuelve
    });

    it("debe salir error al crear un token", async () => {
      // Mock para que lance un error
      jest.spyOn(jwtLib, "sign").mockImplementation(() => {
        throw new Error("Falló la creación");
      });

      const result = await jwt.Crear_JWT("Id");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al crear el token, intente de nuevo");
    });
  });

  // ---------------------------
  // Tests para leer Token
  // ---------------------------
  describe("Leer Token", () => {
    it("el token es correcto", async () => {
      // Mock de jwt.verify para que devuelva un payload simulado
      jest
        .spyOn(jwtLib, "verify")
        .mockReturnValue({ id: "Id", iat: 123, exp: 456 } as any);

      const result = await jwt.Leer_JWT("tokenSimulado");

      expect(result.state).toBe(true);
      expect(result.content).toBeDefined();
    });

    it("el token caduco o no es correcto", async () => {
      // Mock para que lance un error
      jest.spyOn(jwtLib, "verify").mockImplementation(() => {
        throw new Error("Token inválido");
      });

      const result = await jwt.Leer_JWT("tokenSimulado");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Token inválido o expirado");
    });
  });
});
