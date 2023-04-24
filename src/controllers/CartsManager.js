import {promises as fs} from 'fs';
import ProductManager from './ProductManager.js';
import { nanoid } from 'nanoid';

const productManager = new ProductManager;
export default class CartManager{
    constructor(){
        this.path = './src/models/carts.json'
    }
    
    
    readCarts = async () =>{
        let carts = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
    }

    writeCarts = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart));
    }
    
    existCart = async (id) => {
        let carts = await this.readCarts();
        return carts.find((prod) => prod.id === parseInt(id));
    }
    addCart = async () =>{
        let oldCarts = await this.readCarts();
        let id = nanoid(4)
        let allCarts = [...oldCarts, {id:id, products:[]}];
        await this.writeCarts(allCarts);
        return 'Carrito agregado';
    }
    getCarts = async () =>{
        return await this.readCarts(); 
    }
    getCartById = async (id) =>{
        let cartById = await this.existCart(id);
        if(!cartById) return 'Carrito no encontrado';
        return  cartById;
    }
    addProductToCart = async(cartId, prodId)=>{
        let cartById = await this.existCart(cartId);
        if(!cartById) return 'Carrito no encontrado';
        let productById = await productManager.existProduct(prodId);
        if(!productById) return 'Producto no encontrado';
        
        let allCarts = await this.readCarts();
        let cartFilter = allCarts.filter((cart) => cart.id != cartId);

        if(cartById.products.some((prod)=> prod.id === prodId)){
            let prodInCart = cartById.products.find((prod)=> prod.id === prodId);
            prodInCart.quantity++;

            let newProductInCart = [cartById, ...cartFilter];
            await this.writeCarts(newProductInCart);
            return 'Producto sumado al carrito'
        }
        cartById.products.push({id:productById.id, quantity:1})
        let newProductInCart = [cartById,...cartFilter];
        await this.writeCarts(newProductInCart);
        return 'Producto agregado al carrito'
    }
}