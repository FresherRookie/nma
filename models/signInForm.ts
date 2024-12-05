import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISignInSchema extends Document {
  email: string;
  password: string;
}

const SignFormSchema = new Schema<ISignInSchema>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const SignInForm =
  models.SignUpForm ||
  mongoose.model<ISignInSchema>('SignInForm', SignFormSchema);

export default SignInForm;
