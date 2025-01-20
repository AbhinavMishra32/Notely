import { Router } from "express";
import { webhook } from "../controller/user.controller";

const router = Router();

router.post("/", webhook);

export default router;