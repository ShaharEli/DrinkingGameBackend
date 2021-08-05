import { Router } from "express";
import { withTryCatch } from "../../utils";
import { checkToken } from "../../middelwares";
import { searchFriends } from "../../controllers/friends";

require("dotenv").config();
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 10,
});

const friendsRouter = Router();
friendsRouter.post("/search", checkToken, (req, res) =>
  withTryCatch(req, res, searchFriends)
);

export default friendsRouter;
