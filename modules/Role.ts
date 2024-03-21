import { IRole } from '@/interfaces/user/Role';
import mongoose, { Schema } from 'mongoose';

const RoleShema = new Schema<IRole>({
    value: { type: String, unique: true, default: 'USER'},
});

export default mongoose.models.Role || mongoose.model<IRole>('Role', RoleShema);
