import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/dashbord.controller.js";

const router = Router();

router.get(
    "/stats",
    isAuthenticated,
    isAdmin,
    getDashboardStats
);

export default router;