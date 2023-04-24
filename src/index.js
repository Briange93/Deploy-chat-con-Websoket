import express from 'express';
import { __dirname } from './utils/path.js';
import {engine} from 'express-handlebars';
import * as path from 'path';
import {Server} from 'socket.io';
import routerSocket from './routes/socket.js';

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
})
server.on('error', (error) => console.log(`Error en el servidor ${error}`));

const io = new Server(server);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
console.log(__dirname);
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




