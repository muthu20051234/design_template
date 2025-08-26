// 🟧 KAMI: New User model
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
passwordHash: { type: String }, // null for Google users
provider: { type: String, enum: ['local','google'], default: 'local' },
photo: { type: String },
},
{ timestamps: true }
);


export default mongoose.model('User', userSchema);