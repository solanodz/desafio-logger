import { Schema } from "mongoose";
import mongoose from "mongoose";

const ticketSchema = new Schema({
    code: { type: String },
    purchase_datetime: { type: String },
    amount: { type: Number },
    purchaser: { type: String }
})


export default mongoose.model('Ticket', ticketSchema);