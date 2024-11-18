import mongoose, { Document, Schema } from 'mongoose';
import { todoStatus } from '../lib/enums';

export interface ITodo extends Document {
  name: string;
  shortDescription: string;
  dateTime: Date;
  status: string;
}

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  dateTime: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(todoStatus),
    default: todoStatus.upcoming,
  },
});

export default mongoose.model<ITodo>('Todo', todoSchema);
