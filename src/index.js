import express from 'express';
import routerProd from './routes/products.js';
import routerCart from './routes/carts.js';
import { __dirname } from './utils/path.js';
import {engine} from 'express-handlebars';
import * as path from 'path';
import  ProductManager  from "./controllers/ProductManager.js"
import {Server} from 'socket.io';
import routerSocket from './routes/socket.js';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
})
server.on('error', (error) => console.log(`Error en el servidor ${error}`));

const io = new Server(server);

const productos = new ProductManager;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
console.log(__dirname);
app.use('/api/carts', routerCart)
app.use('/api/products', routerProd)
app.use('/', routerSocket)
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views', path.resolve(__dirname,'../views'))
app.use(express.static(path.join(__dirname,'../public')))

const mensajes = []

io.on('connection', (socket) =>{
  console.log('Ciente Conectado')
  socket.on('mensaje', info =>{
    mensajes.push(info)
    io.emit('messageLogs', mensajes)
    })
}) 
/*
app.get('/',async (req,res)=>{
let allProducts = await productos.getProducts()
    res.render('home', {
    title:'Brian | CoderHouse',
    product: allProducts
})

});
*/






