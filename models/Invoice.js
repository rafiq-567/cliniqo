import { Schema, model, models, Types } from 'mongoose';

const invoiceSchema = new Schema({
  patientId:     { type: Types.ObjectId, ref: 'Patient', required: true },
  appointmentId: { type: Types.ObjectId, ref: 'Appointment' },
  items: [{
    description: { type: String, required: true },
    quantity:    { type: Number, default: 1 },
    unitPrice:   { type: Number, required: true },
    total:       { type: Number, required: true },
  }],
  totalAmount:   { type: Number, required: true },
  status:        { type: String, enum: ['pending','paid','cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cash','card','online'] },
  paidAt:        { type: Date },
}, { timestamps: true });

export default models.Invoice || model('Invoice', invoiceSchema);