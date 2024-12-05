import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  emailVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
