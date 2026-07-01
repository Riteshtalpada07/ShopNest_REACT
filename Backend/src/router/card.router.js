import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import * as CardController from '../controllers/card.controller.js'

const route = Router();

route.post("/add",isAuthenticated,CardController.addToCard);

route.get("/:id",isAuthenticated,CardController.getCartData)

route.delete("/:userId/:productId",CardController.removeCartProduct);


export default route;