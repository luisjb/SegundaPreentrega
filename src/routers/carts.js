import { Router } from "express";
import cartApiFile from "../daos/carts/cartsDaoFile.js";
import cartApiMongo from "../daos/carts/cartsDaoMongo.js";
import cartApiFirebase from "../daos/carts/cartsDaoFirebase.js";
import 'dotenv/config';


const selectDao = (db) => {
    switch (db) {
        case "mongo":
            return cartApiMongo;
        case "archivo":
            return cartApiFile;
        case "firebase":
            return cartApiFirebase;
        default:
            break;
    }
}

const carts = selectDao(process.env.DB) 
const cartsApiRouter = new Router();

let Admin = true;

cartsApiRouter.get('/', async (req, res) => {
    try {
        res.json(await carts.listAllCarts())
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.get('/:id', async (req, res) => {
    try {
        res.json(await carts.listCart(req.params.id))
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.get('/:id/products', async (req, res) => {
    try {
        res.json(await carts.listCartProducts(req.params.id))
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.post('/', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.addCart())
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.post('/:idCart/products/:idProduct', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.addProductsToCart(req.params.idCart, req.params.idProduct))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.delete('/:idCart/products/:idProduct', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteProductsToCart(req.params.idCart, req.params.idProduct))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.put('/:id', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.update({ ...req.body, id: req.params.id }))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.delete('/:id', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteCart(req.params.id))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.delete('/', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteAllCarts())
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})


export default cartsApiRouter;