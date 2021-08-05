import { IUserDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const userDbSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    userName: {
      type: String,
      required: true,
      trim: true,
      validate: (e: string) => e.length > 5,
      index: true,
      unique: true,
    },
    blocked: {
      default: [],
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
    },
    friends: {
      default: [],
      ref: "User",
      type: [mongoose.Schema.Types.ObjectId],
    },
    lastConnected: { type: Date, default: new Date() },
    socketId: { type: String },
    avatar: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    firebaseToken: { type: String },
    language: {
      type: String,
      default: "he",
      enum: ["he", "en"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const User = mongoose.model<IUserDoc>("User", userDbSchema);

export default User;
