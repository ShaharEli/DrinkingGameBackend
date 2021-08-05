import { IErrorDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const errorDbSchema: Schema = new mongoose.Schema(
  {
    info: { type: String, trim: true },
    error: { type: String, trim: true },
    user: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    platform: { type: String, enum: ["ios", "android"] },
    // add device id?
  },
  { timestamps: true }
);

errorDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const Error = mongoose.model<IErrorDoc>("Error", errorDbSchema);
export default Error;
