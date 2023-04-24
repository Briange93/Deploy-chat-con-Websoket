import {promises as fs} from 'fs';
import {nanoid} from 'nanoid';

export default class ProductManager{
    constructor(){
        this.path = './src/models/products.json'
    }
    

    readProducts = async () =>{
        let products = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    }

    writeProducts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    existProduct = async (id) => {
        let products = await this.readProducts();
        return products.find((prod) => prod.id === parseInt(id));
    }
    addProduct = async (product) =>{
        let oldProducts = await this.readProducts(); 
        let allProducts = [...oldProducts, product];
        product.id = nanoid(4);
        await this.writeProducts(allProducts)
        return 'Producto agregado';
    }

    getProducts = async () =>{
        return await this.readProducts(); 
    }

    getProductsById = async (id) =>{
        let productById = await this.existProduct(id)
        if(!productById) return 'Producto no encontrado'
        return  productById;
    }

    updateProductById = async (id, product) => {
        let productById = await this.existProduct(id);
        if(!productById) return 'Producto no encontrado'
        await this.deleteProductById(id);
        let oldProducts = await this.readProducts();
        let products = [{...product, id : id}, ...oldProducts];
        await this.writeProducts(products);
        return 'Producto actualizado'       
    }

    deleteProductById = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(prod => prod.id ===id)
        if(existProduct){
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return 'Producto eliminado'
        }
            return 'Producto inexistente'
    }
}
