import { Schema, model, models, Types } from 'mongoose';

const prescriptionSchema = new Schema({
  patientId: { type: Types.ObjectId, ref: 'Patient', required: true },
  doctorId:  { type: Types.ObjectId, ref: 'Doctor',  required: true },
  recordId:  { type: Types.ObjectId, ref: 'MedicalRecord' },
  medicines: [{
    name:      { type: String, required: true },
    dosage:    { type: String, required: true },
    frequency: { type: String, required: true },
    duration:  { type: String, required: true },
    notes:     String,
  }],
  instructions: { type: String },
  issuedAt:     { type: Date, default: Date.now },
  validUntil:   { type: Date },
}, { timestamps: true });

export default models.Prescription || model('Prescription', prescriptionSchema);