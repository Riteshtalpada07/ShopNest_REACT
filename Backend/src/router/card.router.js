import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import * as CardController from '../controllers/card.controller.js'

const route = Router();

route.post("/add",isAuthenticated,CardController.addToCard);4

route.get("/:id",isAuthenticated,CardController.getCartData)


export default route;