"use strict";

const businessRules = require('./need-to-purchase.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/getAll', async (req, res) => {
    try{
        res.send(await businessRules.getAll());
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

route.get('/getById', async (req, res) => {
    try{
        res.send(await businessRules.getById(req.query.id));
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

route.get('/getBySituationId', async (req, res) => {
    try{
        res.send(await businessRules.getBySituationId(req.query.situationId));
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

route.get('/getLate', async (req, res) => {
    try{
        res.send(await businessRules.getLate());
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

route.post('/insert', async (req, res) => {
    try{
        req.body.isAutomatic = false;

        res.send((await businessRules.insert(req.body)).toString());
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

route.put('/update', async (req, res) => {
    try{
        res.send((await businessRules.update(req.body)).toString());
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
});

module.exports = route;