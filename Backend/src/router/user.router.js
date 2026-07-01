import { Router } from "express";
import * as authController from "../controllers/user.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);

authRouter.post("/login",authController.login);

authRouter.get("/me",authMiddleware.isAuthenticated,authController.getMe)

authRouter.get("/logout",authController.logout);


export default authRouter;