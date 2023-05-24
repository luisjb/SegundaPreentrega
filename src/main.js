import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import productosApiRouter from "./routers/products.js";
import cartsApiRouter from "./routers/carts.js";

const app = express();

const uri = config.mongoRemote.cnxStr;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productosApiRouter);
app.use('/api/carts', cartsApiRouter);


const connectedServer = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})

mongoose.connect(uri, config.mongoRemote.client)

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))