import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signUp);
router.post("/signin", signIn);
router.post("/signin", signOut);

export default router;