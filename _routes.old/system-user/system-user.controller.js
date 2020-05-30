"use strict";

const businessRules = require('./system-user.business-rules');
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

route.post('/insert', async (req, res) => {
    try{
        res.send((await businessRules.insert(req.body)).toString());
    } catch(e){
        res.status(400).send(e.message)
    }
});

route.put('/update', async (req, res) => {
    try{
        res.send((await businessRules.update(req.body)).toString());
    } catch(e){
        res.status(400).send(e.message)
    }
});

route.delete('/delete', async (req, res) => {
    try{
        res.send((await businessRules.delete(req.query.id)).toString());
    } catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
});

module.exports = route;