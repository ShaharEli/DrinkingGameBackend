import { Lang } from "./user";
import { Document } from "mongoose";

export type DareType = "question" | "dare";
export interface IDare {
  type: DareType;
  text: string;
  img: string;
  punishment: string;
  language: Lang;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface IDareDoc extends Document, Omit<IDare, "_id"> {}
