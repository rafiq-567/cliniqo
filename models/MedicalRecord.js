import { Schema, model, models, Types } from 'mongoose';

const medicalRecordSchema = new Schema({
  patientId:     { type: Types.ObjectId, ref: 'Patient', required: true },
  doctorId:      { type: Types.ObjectId, ref: 'Doctor',  required: true },
  appointmentId: { type: Types.ObjectId, ref: 'Appointment' },
  diagnosis:     [{ type: String, required: true }],
  symptoms:      [String],
  vitals: {
    bp: String, pulse: Number, temp: Number, weight: Number, height: Number
  },
  notes:         { type: String },
  followUpDate:  { type: Date },
}, { timestamps: true });

export default models.MedicalRecord || model('MedicalRecord', medicalRecordSchema);