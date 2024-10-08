import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true, // Ensures the email is stored in lowercase // not sure if I should enforce this or not...
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Validates email structure
    },
    password: { type: String, required: true, trim: true},
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

