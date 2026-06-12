import { Schema, model, models, Types } from 'mongoose';

const bedSchema = new Schema({
  bedNumber: { type: String, required: true, unique: true },
  ward:      { type: String, required: true },
  floor:     { type: Number },
  type:      { type: String, enum: ['general','private','icu','emergency'] },
  status:    { type: String, enum: ['available','occupied','maintenance'], default: 'available' },
  patientId: { type: Types.ObjectId, ref: 'Patient' },
  admittedAt:{ type: Date },
}, { timestamps: true });

export default models.Bed || model('Bed', bedSchema);