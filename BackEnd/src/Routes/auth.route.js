import express from "express";
import {
  userSignUp,
  userLogin,
  logoutUser,
  changePassword,
  check
} from "../Controllers/auth.controller.js";
import { auth } from "../Middlewares/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", userSignUp);
AuthRouter.post("/login", userLogin);
AuthRouter.post("/logout",auth, logoutUser);
AuthRouter.get("/check",auth, check);
AuthRouter.post("/change-password",auth, changePassword);

export { AuthRouter };
