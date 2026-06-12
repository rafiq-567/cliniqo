import { Schema, model, models, Types } from 'mongoose';

const staffSchema = new Schema({
  userId:      { type: Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true },
  role:        { type: String, enum: ['nurse','receptionist','technician','pharmacist'], required: true },
  department:  { type: String, required: true },
  shift:       { type: String, enum: ['morning','evening','night'] },
  phone:       { type: String },
  joiningDate: { type: Date },
}, { timestamps: true });

export default models.Staff || model('Staff', staffSchema);