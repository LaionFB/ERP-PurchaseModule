"use strict";

const businessRules = require('./purchase-situation.business-rules');
const express       = require('express');
const route         = express.Router();

route.get('/getAll', async (req, res) => {
    try{
        res.send(await businessRules.getAll());
    } catch(e){
        res.status(400).send(e.message)
    }
});

route.get('/getById', async (req, res) => {
    try{
        res.send(await businessRules.getById(req.query.id));
    } catch(e){
        res.status(400).send(e.message)
    }
});

module.exports = route;