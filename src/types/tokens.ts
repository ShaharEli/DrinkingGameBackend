import { UserRole } from "./user";
import { Document } from "mongoose";

export interface EncodeResult {
  userId: string;
  userName: string;
  role: UserRole;
}

export interface IRefreshToken {
  token: string;
  userId: string;
  _id: string;
}
export interface IRefreshTokenDoc
  extends Document,
    Omit<IRefreshToken, "_id"> {}
