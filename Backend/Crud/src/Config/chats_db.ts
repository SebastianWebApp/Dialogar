// We import the mongoose module, which is used to interact with MongoDB databases.
import mongoose from "mongoose";

// We extract the necessary objects from mongoose:
// - model: to define new data models.
// - models: to access previously defined models.
// - Schema: to define the structure of documents in a collection.
const { model, models, Schema } = mongoose;

const Chat_Schema = new Schema(
  {
    User: [{ type: String, required: true }],
    Messages: [
      {
        sender: { type: String, required: true },
        image: { type: String },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    collection: "Chat", // Name of the collection in the database
    versionKey: false,
    timestamps: true, // Automatically adds created and updated timestamps
  }
);

// We export the `Mongo_Chat` model:
// - If a model named "Mongo_Chat" already exists in `models`, we reuse it.
// - If it does not exist, we create a new model with the `Character_Schema` schema.
export const Mongo_Chat = models.Mongo_Chat || model("Mongo_Chat", Chat_Schema);
