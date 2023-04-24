import {Router} from 'express';
import  ProductManager  from "../controllers/ProductManager.js"

const routerProd = Router();
const productos = new ProductManager;

routerProd.get('/', async (req, res) => {
    let message = await productos.getProducts()
    res.send(message);
});
routerProd.get('/:pid', async (req, res) =>{
    let id = parseInt(req.params.pid);
    let product = await productos.getProductsById(id);
    res.send(product);
});
routerProd.post('/', async(req,res) =>{
    let message = await productos.addProduct(req.body)
    res.send(message);
})
routerProd.put('/:pid', async (req, res) =>{
    let id = parseInt(req.params.pid);
    let updateProduct = req.body;
    res.send(await productos.updateProductById(id, updateProduct));
});
routerProd.delete('/:pid', async (req,res) =>{
    let id = parseInt(req.params.pid);
    let message = await productos.deleteProductById(id);
    res.send(message);
})
export default routerProd;