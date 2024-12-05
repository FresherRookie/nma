import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISignUpSchema extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
}

const SignUpFormSchema = new Schema<ISignUpSchema>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SignUpForm =
  models.SignUpForm ||
  mongoose.model<ISignUpSchema>('SignUpForm', SignUpFormSchema);

export default SignUpForm;
