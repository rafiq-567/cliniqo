import { model, models, Schema } from "mongoose";

const doctorSchema = new Schema({
    // Changed Types.ObjectID to Schema.Types.ObjectId
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    licenseNo: { type: String, required: true, unique: true },
    
    // Fixed the syntax for qualification
    qualification: { type: String }, 
    
    department: { type: String },
    availableDays: [{ type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
    consultationFee: { type: Number, min: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default models.Doctor || model('Doctor', doctorSchema);