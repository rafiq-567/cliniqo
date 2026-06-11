import { model, models, Schema } from "mongoose";

const patientSchema = new Schema({
    name : {type: String, required: true, trim: true},
    dob : {type: Date , required: true},
    gender: {type: String, enum:["male", "female", "other"], required: true},
    phone: {type: String, required: true},
    email: {type: String, lowercase: true},
    bloodgroup: {type: String, enum:[ 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']},
    adress: {street: String, city: String, state: String, Zip: String},
    emergencycontact: {name: String, relation: String, phone: String},
}, { timestamps: true })

export default models.Patient || model('Patient', patientSchema);