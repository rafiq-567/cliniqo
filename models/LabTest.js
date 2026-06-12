import { Schema, model, models, Types } from 'mongoose';

const labTestSchema = new Schema({
  patientId:   { type: Types.ObjectId, ref: 'Patient',       required: true },
  recordId:    { type: Types.ObjectId, ref: 'MedicalRecord' },
  orderedBy:   { type: Types.ObjectId, ref: 'Doctor',        required: true },
  testName:    { type: String, required: true },
  status:      { type: String, enum: ['ordered','in-progress','completed'], default: 'ordered' },
  results:     { type: Schema.Types.Mixed },
  reportUrl:   { type: String },
  orderedAt:   { type: Date, default: Date.now },
  completedAt: { type: Date },
}, { timestamps: true });

export default models.LabTest || model('LabTest', labTestSchema);