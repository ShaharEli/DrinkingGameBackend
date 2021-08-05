import { Router } from "express";
import { checkToken } from "../../middelwares";
import friendsRouter from "./friends";
import authRouter from "./auth";
const router = Router();

router.use("/auth", authRouter);
router.use(checkToken);

router.use("/friends", friendsRouter);

export default router;
