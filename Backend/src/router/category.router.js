import { Router } from "express";
const route = Router();
import * as categoryController from '../controllers/category.controller.js';
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

route.post(
    "/",
    isAuthenticated,
    isAdmin,
    categoryController.createCategory
);

route.get("/", categoryController.getAll);

route.put(
    "/:id",
    isAuthenticated,
    isAdmin,
    categoryController.updateCategory
);

route.delete(
    "/:id",
    isAuthenticated,
    isAdmin,
    categoryController.deleteCategory
);


export default route;

