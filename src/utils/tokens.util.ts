import jwt, { Secret, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import RefreshToken from "../db/schemas/refreshToken";
import User from "../db/schemas/user";
import Logger from "../logger/logger";
import { Falsy, EncodeResult } from "../types";
import { createError } from ".";

require("dotenv").config();

export const verifyAccessToken = (token: string): Falsy<EncodeResult> => {
  try {
    const data = <EncodeResult>(
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret)
    );
    return data;
  } catch {
    return false;
  }
};

export const generateAccessToken = (
  id: string,
  userName: string,
  role: string
) =>
  jwt.sign(
    {
      userId: id,
      userName,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: "15m" }
  );

export const verifyRefreshToken = (token: string): Falsy<EncodeResult> => {
  try {
    const data = <EncodeResult>(
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret)
    );
    return data;
  } catch {
    return false;
  }
};

export const generateRefreshToken = async (
  id: string,
  userName: string,
  role: string
): Promise<string | void> => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");
    await RefreshToken.deleteMany({ userId: id });

    const token = jwt.sign(
      {
        userId: id,
        userName,
        role,
      },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1y" }
    );

    const newRefreshToken = new RefreshToken({
      userId: id,
      token,
    });
    await newRefreshToken.save();
    return token;
  } catch ({ message }) {
    createError(message, 402);
    //TODO  change status
    Logger.error(message);
  }
};
