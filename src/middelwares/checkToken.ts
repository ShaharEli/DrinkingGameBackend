import { Maybe, EncodeResult as EncodeResults } from "../types";
import jwt, { Secret, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { Response, Request, NextFunction, RequestHandler } from "express";

require("dotenv").config();

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
):
  | RequestHandler<{}, any, any, {}>
  | Response<any, Record<string, any>>
  | void => {
  let token = req.headers.authorization;
  if (!token || Array.isArray(token))
    return res.status(400).json({ error: "No token sent" });
  token = token.split(" ")[1];
  try {
    const data = <EncodeResults>(
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret)
    );
    req.userId = data.userId;
    req.userName = data.userName;
    req.role = data.role;
    return next();
  } catch {
    return res.status(403).json({ error: "token not valid" });
  }
};
