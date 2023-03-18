import express from "express";
import productsController from "../controller/products";

const routerShop = express.Router();

routerShop.get('/', productsController.getHome);

export default routerShop;
