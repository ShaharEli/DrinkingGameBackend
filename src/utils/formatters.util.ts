import { IName } from "../types";
import { nanoid } from "nanoid";
import User from "../db/schemas/user";

const getUserName = ({ firstName, lastName }: IName) =>
  `${firstName}_${lastName}_` + nanoid(4);

export const generateUserName = async ({ firstName, lastName }: IName) => {
  let userName = getUserName({ firstName, lastName });
  while (await User.findOne({ userName })) {
    userName = getUserName({ firstName, lastName });
  }
  return userName;
};
