"use strict";

const businessRules = require('./provider-product.business-rules');
const express       = require('express');
const route         = express.Router();

route.post('/', async (req, res, next) => {
    try{
        let insertedId = await businessRules.insert(req.body);
        res.send({ insertedId });
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.delete('/:providerId/:productId', async (req, res, next) => {
    try{
        let rowsAffected = await businessRules.delete(req.params.providerId, req.params.productId);
        res.send({ rowsAffected });
        next();
    } catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
});

module.exports = route;