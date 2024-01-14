import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    carts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carts',
        }], default: []
    },
}, { timestamps: true });

export default mongoose.model('Users', userSchema);