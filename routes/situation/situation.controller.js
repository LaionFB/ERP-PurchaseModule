"use strict";

const businessRules = require('./situation.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/purchase-order', async (req, res, next) => {
    try{
        let result = await businessRules.getPurchaseOrderSituations();
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.get('/quotation', async (req, res, next) => {
    try{
        let result = await businessRules.getQuotationSituations();
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.get('/purchase', async (req, res, next) => {
    try{
        let result = await businessRules.getPurchaseSituations();
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

module.exports = route;