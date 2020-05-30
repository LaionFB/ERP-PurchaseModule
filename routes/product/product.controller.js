"use strict";

const businessRules = require('./product.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/get-all', async (req, res) => {
    try{
        let result = await businessRules.getAll();
        res.send(result);
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.get('/get-by-id', async (req, res) => {
    try{
        let result = await businessRules.getById(req.query.id);
        res.send(result);
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.post('/insert', async (req, res) => {
    try{
        let insertedId = await businessRules.insert(req.body);
        res.send({ insertedId });
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.put('/update', async (req, res) => {
    try{
        let rowsAffected = await businessRules.update(req.body);
        res.send({ rowsAffected });
    } catch(e){
        console.error(e);
        res.status(400).send(e.message)
    }
});

route.delete('/delete', async (req, res) => {
    try{
        let rowsAffected = await businessRules.delete(req.query.id);
        res.send({ rowsAffected });
    } catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
});

module.exports = route;