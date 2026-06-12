import { Schema, model, models, Types } from 'mongoose';

const departmentSchema = new Schema({
  name:          { type: String, required: true, unique: true },
  headDoctorId:  { type: Types.ObjectId, ref: 'Doctor' },
  description:   { type: String },
  floor:         { type: Number },
  phone:         { type: String },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

export default models.Department || model('Department', departmentSchema);