import { Crud_Chats } from "../Services/chats.service.ts";
import { Mongo_Chat } from "../Config/chats_db.ts";

jest.mock("../Config/chats_db");

describe("Crud_Chats Service", () => {
  let chatsCrud: Crud_Chats;

  // Se ejecuta antes de cada test: crea una nueva instancia y limpia los mocks
  beforeEach(() => {
    chatsCrud = new Crud_Chats();
    jest.clearAllMocks();
  });

  // ---------------------------
  // Tests para Create
  // ---------------------------
  describe("Create", () => {
    it("debe crear un chat correctamente", async () => {
      (Mongo_Chat.create as jest.Mock).mockResolvedValue({});

      const result = await chatsCrud.Create(
        ["Id_1", "Id_2"],
        [
          {
            sender: "string",
            content: "string",
            image: "string",
          },
        ]
      );

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBeDefined();
    });
  });

  // ---------------------------
  // Tests para Read
  // ---------------------------
  describe("Read", () => {
    it("debe leer los mensajes correctamente", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue({});

      const result = await chatsCrud.Read("Id", "1");

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBeDefined();
    });

    it("no existe el chat", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue(null);

      const result = await chatsCrud.Read("Id", "1");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBeDefined();
    });
  });

  // ---------------------------
  // Tests para Update
  // ---------------------------
  describe("Update", () => {
    it("debe actualizar los mensajes correctamente", async () => {
      const mockSave = jest.fn().mockResolvedValue(true);

      const mockChat = {
        Messages: [],
        save: mockSave,
      };

      (Mongo_Chat.findById as jest.Mock).mockResolvedValue(mockChat);

      const messagesToAdd = [
        {
          sender: "string",
          content: "string",
          image: "string",
        },
      ];

      const result = await chatsCrud.Update("id_existente", messagesToAdd);

      // Verificamos que los mensajes se hayan agregado
      expect(mockChat.Messages).toEqual(messagesToAdd);

      // Verificamos que save haya sido llamado
      expect(mockSave).toHaveBeenCalled();

      expect(result).toEqual({
        state: true,
        content: messagesToAdd,
      });
    });

    it("no existe el chat", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue(null);

      const result = await chatsCrud.Update("Id", [
        {
          sender: "string",
          content: "string",
          image: "string",
        },
      ]);

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBeDefined();
    });
  });

  // ---------------------------
  // Tests para Delete Message
  // ---------------------------
  describe("Delete Message", () => {
    it("debe eliminar los mensajes correctamente", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue({});
      (Mongo_Chat.updateOne as jest.Mock).mockResolvedValue({});

      const result = await chatsCrud.Delete_Message("Id", "Id_Message");

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBe("Mensaje eliminado correctamente");
    });

    it("no existe el chat", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue(null);

      const result = await chatsCrud.Delete_Message("Id", "Id_Message");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBeDefined();
    });
  });

  // ---------------------------
  // Tests para Delete Chat
  // ---------------------------
  describe("Delete Chat", () => {
    it("debe eliminar el chat correctamente", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue({});
      (Mongo_Chat.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const result = await chatsCrud.Delete_Chat("Id");

      // Validación
      expect(result.state).toBe(true);
      expect(result.content).toBe("Chat eliminado correctamente");
    });

    it("no existe el chat", async () => {
      (Mongo_Chat.findById as jest.Mock).mockResolvedValue(null);

      const result = await chatsCrud.Delete_Chat("Id");

      // Validación
      expect(result.state).toBe(false);
      expect(result.content).toBeDefined();
    });
  });
});
