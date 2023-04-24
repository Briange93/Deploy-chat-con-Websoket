import { Router } from "express";
import CartManager from "../controllers/CartsManager.js";

const routerCart = Router()
const cartManager = new CartManager

routerCart.get('/', async(req,res)=>{
  let message = await cartManager.getCarts();
  res.send(message)
})

routerCart.post('/', async(req,res)=>{
  let message = await cartManager.addCart();
  res.send(message)
})

routerCart.get('/:cid', async(req,res)=>{
  let id = parseInt(req.params.cid);
  let message = await cartManager.getCartById(id);
  res.send(message);
})
routerCart.post('/:cid/products/:pid', async(req,res)=>{
  let cartId= parseInt(req.params.cid);
  let prodId= parseInt(req.params.pid);
  res.send(await cartManager.addProductToCart(cartId,prodId));
})



export default routerCart