import mongoose from 'mongoose';
import {User} from '../../types/user.type.js';
import {UserType} from '../../types/user-type.enum.js';

export interface UserDocument extends User, mongoose.Document {}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarPath: String,
  type: UserType,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
