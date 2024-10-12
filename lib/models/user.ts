import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  setPassword(password: string): Promise<void>; // Method to set a salted password
  validatePassword(password: string): Promise<boolean>; // Method to validate password
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

// Method to set a salted password
UserSchema.methods.setPassword = async function(password: string) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

// Method to validate password
UserSchema.methods.validatePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

