import { IUser } from '@/interfaces/user/User';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema<IUser>(
  {
    //   username: { type: String, required: false, default: 'usernameExample' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role', default: 'USER' }],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
