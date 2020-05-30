"use strict";

const fs         = require('fs');
const express    = require('express');
const route      = express.Router();

let routeNames = fs.readdirSync('./routes');

route.use((req, res, next) => {
    console.log(`${req.method.toUpperCase()}: ${req.originalUrl} ${Object.keys(req.body).length ? 'body-length=' + JSON.stringify(req.body).length : ''}`);
    next();
});

routeNames.map((routeName) => {
    if(fs.existsSync(`./routes/${routeName}/${routeName}.controller.js`)){
        let controller = require(`./routes/${routeName}/${routeName}.controller`);
        route.use('/' + routeName, controller);
        console.log(`-Setup "/${routeName}" route.`);
    }
    if(fs.existsSync(`./routes/${routeName}/${routeName}.message-bus.js`)){
        require(`./routes/${routeName}/${routeName}.message-bus`);
        console.log(`-Setup "${routeName}" message bus.`);
    }
});

route.use((req, res) => {
    console.log(` ↳ ${res.statusCode}: body-length=${res._contentLength}`);
});

module.exports = route;