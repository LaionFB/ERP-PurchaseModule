"use strict";

const businessRules = require('./provider-product.business-rules');
const express       = require('express');
const route         = express.Router();

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
        let rowsAffected = await businessRules.delete(req.query.providerId, req.query.productId);
        res.send({ rowsAffected });
        next();
    } catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
});

module.exports = route;