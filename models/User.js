import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    email : {type: String, required: true, unique: true, lowercase: true},
    password : {type: String, required: true},
    role : {type : String, enum: ['admin', 'doctor', 'nurse', 'receptionist'], required: true},
    isActive : {type : Boolean, default: true},
    lastLogin : {type: Date},

}, {timestamps: true});

export default models.User || model('User', userSchema)