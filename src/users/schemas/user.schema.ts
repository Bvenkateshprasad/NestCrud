import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// 🔹 Define an interface that extends Mongoose Document & adds `validatePassword`
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    age?: number;
    validatePassword(password: string): Promise<boolean>;
  }
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// 🔹 Hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Correctly define `validatePassword` as a schema method
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
