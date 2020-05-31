"use strict";

const fs         = require('fs');
const express    = require('express');

let routeNames = fs.readdirSync(__dirname);

let router = () => {
    const route = express.Router();

    route.use((req, res, next) => {
        console.log(`${req.method.toUpperCase()}: ${req.originalUrl} ${Object.keys(req.body).length ? 'body-length=' + JSON.stringify(req.body).length : ''}`);
        next();
    });
    
    routeNames.map((routeName) => {
        if(fs.existsSync(`${__dirname}/${routeName}/${routeName}.controller.js`)){
            let controller = require(`./${routeName}/${routeName}.controller`);
            route.use('/' + routeName, controller);
                
            console.log(`-Setup "/${routeName}" route.`);
        }
    });
    
    route.use((req, res) => {
        console.log(` ↳ ${res.statusCode}: response-length=${res._contentLength}`);
    });

    return route;
}

module.exports = router;