import { Router } from "express";
import * as productColtroller from '../controllers/product.controller.js'
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const productRoute = Router();

productRoute.post(
    "/",
    isAuthenticated,
    isAdmin,
    productColtroller.createProduct
);

productRoute.get("/",
    productColtroller.getAll);

productRoute.get("/:id", 
    productColtroller.getSingleProduct);

productRoute.put("/:id",
    isAuthenticated,
    isAdmin,
    productColtroller.updateProduct);

productRoute.delete("/:id",
    isAuthenticated,
    isAdmin,
    productColtroller.deleteProduct);


productRoute.get("/category/:id",
     productColtroller.getProductsByCategory);


export default productRoute;