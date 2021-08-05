import { Request, Response } from 'express';
import User from '../db/schemas/user';
import { friendsFields, createError } from '../utils';

const FRIENDS_LIMIT = 30;

export const searchFriends = async (req: Request, res: Response) => {
  const { friendUserName = '' } = req.body;
  if (!friendUserName || !req.userName) return createError('friendUserName field missing', 400);
  const possibleMatches = await User.find({
    $and: [
      { userName: { $regex: `^${friendUserName}`, $options: 'i' } },
      { userName: { $nin: [req.userName] } },
    ],
  })
    .select(friendsFields)
    .limit(FRIENDS_LIMIT);
  res.json({ possibleMatches });
};
