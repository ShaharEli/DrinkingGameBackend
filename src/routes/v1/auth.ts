import { Router } from "express";
import { withTryCatch } from "../../utils";
import { checkToken } from "../../middelwares";
import rateLimit from "express-rate-limit";
import {
  login,
  getToken,
  register,
  verifyMail,
  loginWithToken,
  logErrorToService,
  editUser,
  checkIfUserNameIsValid,
} from "../../controllers";

require("dotenv").config();

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 10,
});

const authRouter = Router();

authRouter.post("/login", (req, res) => withTryCatch(req, res, login));

authRouter.post("/error", (req, res) =>
  withTryCatch(req, res, logErrorToService)
);

authRouter.post("/login-with-token", (req, res) =>
  withTryCatch(req, res, loginWithToken)
);

authRouter.post("/get-token", apiLimiter, (req, res) =>
  withTryCatch(req, res, getToken)
);

authRouter.post("/register", (req, res) => withTryCatch(req, res, register));

authRouter.post("/verify-mail", (req, res) =>
  withTryCatch(req, res, verifyMail)
);

authRouter.put("/edit", checkToken, (req, res) =>
  withTryCatch(req, res, editUser)
);

authRouter.post("/check-username", checkToken, (req, res) =>
  withTryCatch(req, res, checkIfUserNameIsValid)
);

export default authRouter;
