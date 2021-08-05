import { Document } from "mongoose";
import { Platform } from "./common";

export interface IError {
  info?: string;
  error?: string;
  user?: string;
  platform?: Platform;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IErrorDoc extends Document, Omit<IError, "_id"> {}
