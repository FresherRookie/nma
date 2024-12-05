import mongoose, { Schema, Document, models } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  createdDate: Date;
  instrument: mongoose.Schema.Types.ObjectId;
  sessionsPerWeek: number;
  grade: string;
  description?: string;
  userId: string;
  backgroundColor?: string;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  instrument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instrument',
    required: true,
  },
  sessionsPerWeek: { type: Number, required: true, min: 1 },
  grade: { type: String, required: true },
  description: { type: String },
  userId: { type: String, required: true },
  backgroundColor: { type: String },
});

const Course = models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
