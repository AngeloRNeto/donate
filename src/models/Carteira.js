import mongoose from "mongoose";

const carteiraSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    address: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    pwd: { type: String, required: true }
}, { versionKey: false });

const carteira = mongoose.model("carteiras", carteiraSchema);

export { carteira, carteiraSchema };