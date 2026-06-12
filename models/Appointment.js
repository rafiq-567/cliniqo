import { Schema, model, models, Types } from 'mongoose';

const appointmentSchema = new Schema({
  patientId: { type: Types.ObjectId, ref: 'Patient', required: true },
  doctorId:  { type: Types.ObjectId, ref: 'Doctor',  required: true },
  date:      { type: Date, required: true },
  timeSlot:  { type: String, required: true },
  status:    { type: String, enum: ['booked','confirmed','completed','cancelled'], default: 'booked' },
  type:      { type: String, enum: ['in-person','online'], default: 'in-person' },
  notes:     { type: String },
}, { timestamps: true });

appointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1 }, { unique: true });

export default models.Appointment || model('Appointment', appointmentSchema);