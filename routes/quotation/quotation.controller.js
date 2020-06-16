"use strict";

const businessRules = require('./quotation.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/get-all', async (req, res, next) => {
    try{
        let result = await businessRules.getAll();
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.get('/get-by-id', async (req, res, next) => {
    try{
        let result = await businessRules.getById(req.query.id);
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

route.put('/update', async (req, res, next) => {
    try{
        let rowsAffected = await businessRules.update(req.body);
        res.send({ rowsAffected });
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


route.get('/get-quotation-situations', async (req, res, next) => {
    try{
        let result = await businessRules.getQuotationSituations();
        res.send(result);
        next();
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

module.exports = route;