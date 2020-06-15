"use strict";

const businessRules = require('./provider-product.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/get-products', async (req, res, next) => {
    try{
        let result = await businessRules.getProducts(req.query.providerId);
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.get('/get-providers', async (req, res, next) => {
    try{
        let result = await businessRules.getProviders(req.query.productId);
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.post('/insert', async (req, res, next) => {
    try{
        let insertedId = await businessRules.insert(req.body);
        res.send({ insertedId });
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.delete('/delete', async (req, res, next) => {
    try{
        let rowsAffected = await businessRules.delete(req.query.id);
        res.send({ rowsAffected });
        next();
    } catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
});

module.exports = route;