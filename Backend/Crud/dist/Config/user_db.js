// We import the mongoose module, which is used to interact with MongoDB databases.
import mongoose from "mongoose";
// We extract the necessary objects from mongoose:
// - model: to define new data models.
// - models: to access previously defined models.
// - Schema: to define the structure of documents in a collection.
const { model, models, Schema } = mongoose;
const User_Schema = new Schema({
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    Avatar: { type: String, required: true },
    Phone: { type: String, required: true, unique: true },
}, {
    collection: "Users", // Name of the collection in the database
    versionKey: false,
    timestamps: true, // Automatically adds created and updated timestamps
});
// We export the `Mongo_User` model:
// - If a model named "Mongo_User" already exists in `models`, we reuse it.
// - If it does not exist, we create a new model with the `Character_Schema` schema.
export const Mongo_User = models.Mongo_User || model("Mongo_User", User_Schema);
