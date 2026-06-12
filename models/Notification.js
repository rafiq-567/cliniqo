import { Schema, model, models, Types } from 'mongoose';

const notificationSchema = new Schema({
  userId:    { type: Types.ObjectId, ref: 'User', required: true },
  type:      { type: String, enum: ['appointment','lab','billing','general'], required: true },
  message:   { type: String, required: true },
  isRead:    { type: Boolean, default: false },
  refId:     { type: Types.ObjectId },
}, { timestamps: true });

export default models.Notification || model('Notification', notificationSchema);