import { User_Crud } from "../Services/user_crud.service.ts";
import { Mongo_User } from "../Config/user_db";
import * as encriptarService from "../Services/encriptar_desencriptar.service.ts";

// Mockeamos los servicios externos (DB y servicio de encriptación)
jest.mock("../Config/user_db");
jest.mock("../Services/encriptar_desencriptar.service.ts");

describe("User_Crud Service", () => {
  let userCrud: User_Crud;

  // Se ejecuta antes de cada test: crea una nueva instancia y limpia los mocks
  beforeEach(() => {
    userCrud = new User_Crud();
    jest.clearAllMocks();
  });

  // ---------------------------
  // Tests para Create
  // ---------------------------
  describe("Create", () => {
    it("debe crear un usuario correctamente", async () => {
      // Mock: encriptar funciona bien
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValue({
        state: true,
        content: "encrypted",
      });
      // Mock: no existe usuario con ese teléfono
      (Mongo_User.findOne as jest.Mock).mockResolvedValue(null);
      // Mock: creación exitosa en la DB
      (Mongo_User.create as jest.Mock).mockResolvedValue({ _id: "mockedId" });

      const result = await userCrud.Create("Test", "1234", "555", "avatar.png");

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBe("mockedId");
    });

    it("debe fallar si la encriptación del teléfono falla", async () => {
      // Mock: fallo en encriptar teléfono
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: false,
        content: "Error en encriptación",
      });

      const result = await userCrud.Create("Test", "1234", "555", "avatar.png");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al encriptar las credenciales");
    });

    it("debe fallar si el teléfono ya está registrado", async () => {
      // Mock: encriptar funciona bien
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValue({
        state: true,
        content: "encrypted",
      });
      // Mock: ya existe usuario con ese teléfono
      (Mongo_User.findOne as jest.Mock).mockResolvedValue({});

      const result = await userCrud.Create("Test", "1234", "555", "avatar.png");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBe("El teléfono ya está registrado");
    });
  });

  // ---------------------------
  // Tests para Update
  // ---------------------------
  describe("Update", () => {
    it("debe actualizar un usuario correctamente", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValue({
        state: true,
        content: "encrypted",
      });
      (Mongo_User.findOne as jest.Mock).mockResolvedValue(null); // No existe otro con el mismo teléfono
      (Mongo_User.findByIdAndUpdate as jest.Mock).mockResolvedValue({}); // Se actualiza bien

      const result = await userCrud.Update(
        "id",
        "Test",
        "1234",
        "555",
        "avatar.png"
      );

      expect(result.state).toBe(true);
      expect(result.content).toBe("Usuario actualizado correctamente");
    });

    it("debe fallar si la encriptación del teléfono falla", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: false,
        content: "Error en encriptación",
      });

      const result = await userCrud.Update(
        "id",
        "Test",
        "1234",
        "555",
        "avatar.png"
      );

      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al encriptar las credenciales");
    });

    it("debe fallar si el usuario no existe", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValue({
        state: true,
        content: "encrypted",
      });
      (Mongo_User.findOne as jest.Mock).mockResolvedValue(null);
      (Mongo_User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // No encuentra usuario

      const result = await userCrud.Update(
        "id",
        "Test",
        "1234",
        "555",
        "avatar.png"
      );

      expect(result.state).toBe(false);
      expect(result.content).toBe("Usuario no encontrado");
    });
  });

  // ---------------------------
  // Tests para Read_Perfil
  // ---------------------------
  describe("Read Perfil", () => {
    it("debe leer el usuario correctamente", async () => {
      // Mock desencriptar bien
      (encriptarService.Desencriptar as jest.Mock).mockResolvedValue({
        state: true,
        content: "desencriptado",
      });
      (Mongo_User.findById as jest.Mock).mockResolvedValue({});

      const result = await userCrud.Read_Perfil("id");

      expect(result.state).toBe(true);
      expect(result.content).toBeDefined(); // Solo verificamos que algo devuelve
    });

    it("debe fallar si la desencriptacion del teléfono falla", async () => {
      (encriptarService.Desencriptar as jest.Mock).mockResolvedValueOnce({
        state: false,
        content: "Error en encriptación",
      });

      const result = await userCrud.Read_Perfil("id");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al desencriptar las credenciales");
    });

    it("debe fallar si el usuario no existe", async () => {
      (Mongo_User.findById as jest.Mock).mockResolvedValue(null);

      const result = await userCrud.Read_Perfil("id");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Usuario no encontrado");
    });
  });

  // ---------------------------
  // Tests para Read_Credenciales
  // ---------------------------
  describe("Read Credenciales", () => {
    it("debe tener las credenciales correctas", async () => {
      // Mock: encriptación de teléfono y password correctas
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPhone",
      });
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPassword",
      });

      // Mock: usuario encontrado con mismo Phone y Password
      (Mongo_User.findOne as jest.Mock).mockResolvedValue({
        Phone: "encryptedPhone",
        Password: "encryptedPassword",
        _id: "Id",
      });

      const result = await userCrud.Read_Credenciales("Password", "Phone");

      expect(result.state).toBe(true);
      expect(result.content).toBe("Id");
    });

    it("debe fallar si la encriptación del teléfono falla", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: false,
        content: "Error en encriptación",
      });

      const result = await userCrud.Read_Credenciales("Password", "Phone");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al encriptar las credenciales");
    });

    it("debe fallar si la contraseña es incorrecta", async () => {
      // Mock encriptación correcta
      (encriptarService.Encriptacion as jest.Mock)
        .mockResolvedValueOnce({ state: true, content: "encryptedPhone" })
        .mockResolvedValueOnce({ state: true, content: "encryptedPassword" });

      // Mock usuario con contraseña distinta
      (Mongo_User.findOne as jest.Mock).mockResolvedValue({
        Phone: "encryptedPhone",
        Password: "otraPassword",
      });

      const result = await userCrud.Read_Credenciales("Password", "Phone");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Contraseña incorrecta");
    });

    it("debe fallar si el usuario no existe", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPhone",
      });
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPassword",
      });

      (Mongo_User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userCrud.Read_Credenciales("Password", "Phone");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Usuario no encontrado");
    });
  });

  // ---------------------------
  // Tests para Find_Perfil
  // ---------------------------
  describe("Buscar Perfil", () => {
    it("debe encontrar el perfil correctamente", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPhone",
      });

      // Mock: simula findOne().select()
      (Mongo_User.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({
          Name: "Name",
          Avatar: "Avatar",
        }),
      });

      const result = await userCrud.Find_Perfil("Phone");

      expect(result.state).toBe(true);
      expect(result.content).toEqual({
        Name: "Name",
        Avatar: "Avatar",
      });
    });

    it("debe fallar si la encriptación del teléfono falla", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: false,
        content: "Error en encriptación",
      });

      const result = await userCrud.Find_Perfil("Phone");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Error al encriptar las credenciales");
    });

    it("debe fallar si el usuario no existe", async () => {
      (encriptarService.Encriptacion as jest.Mock).mockResolvedValueOnce({
        state: true,
        content: "encryptedPhone",
      });

      (Mongo_User.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(null), // No encuentra usuario
      });

      const result = await userCrud.Find_Perfil("Phone");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Usuario no encontrado");
    });
  });

  // ---------------------------
  // Tests para Data_Perfil
  // ---------------------------
  describe("Datos del Perfil", () => {
    it("debe encontrar el perfil correctamente", async () => {
      (Mongo_User.findById as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue({
          Name: "Name",
          Avatar: "Avatar",
        }),
      });

      const result = await userCrud.Data_Perfil("Id");

      expect(result.state).toBe(true);
      expect(result.content).toEqual({
        Name: "Name",
        Avatar: "Avatar",
      });
    });

    it("debe fallar si el usuario no existe", async () => {
      (Mongo_User.findById as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(null), // No encuentra usuario
      });

      const result = await userCrud.Data_Perfil("Id");

      expect(result.state).toBe(false);
      expect(result.content).toBe("Usuario no encontrado");
    });
  });
});
