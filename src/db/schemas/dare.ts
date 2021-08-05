import { IDareDoc } from "../../types";
import mongoose, { Schema } from "mongoose";

const dareDbSchema: Schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["question", "dare"], required: true },
    text: { type: String, required: true, trim: true },
    img: { type: String },
    punishment: { type: String, required: true, trim: true },
    language: {
      type: String,
      required: true,
      default: "en",
      trim: true,
      enum: ["en", "he"],
    },
  },
  { timestamps: true }
);

dareDbSchema.set("toJSON", {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const Dare = mongoose.model<IDareDoc>("Dare", dareDbSchema);
export default Dare;
