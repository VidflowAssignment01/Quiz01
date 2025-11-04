import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  verifyUser
} from "../Controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";
const AuthRouter = express.Router();

AuthRouter.post("/signup", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/logout", auth, logoutUser);
AuthRouter.get("/check", auth, verifyUser);
AuthRouter.post("/change-password", auth, updatePassword);

export { AuthRouter };
