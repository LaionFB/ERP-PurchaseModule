#!/usr/bin/env node
"use strict";

console.log('-Starting...');

const cors                = require('cors');
const express             = require('express');
const bodyParser          = require('body-parser');
const router              = require('./routes/router');
const setupDatabase       = require('./database/setup-database');
const messageBusSubscribe = require('./message-bus/message-bus.event-handler');
const messageBus          = require('./message-bus/message-bus');
const config              = require('./config');

const _main = async () => {
    const app = express();

    app.use(config.API_GATEWAY_PATH + '/swagger', express.static('swagger-ui-dist'));
    app.get(config.API_GATEWAY_PATH, (req, res) => res.redirect(config.API_GATEWAY_PATH + '/swagger'));

    app.use(cors());
    app.use(bodyParser.json());
    app.use(config.API_GATEWAY_PATH, router());

    if(config.DB_SYNC_DATABASE == 'Y')
        await setupDatabase.syncDatabase();
    if(config.DB_SYNC_TABLES == 'Y')
        await setupDatabase.syncTables();
    if(config.DB_SYNC_DATA == 'Y')
        await setupDatabase.syncData();

    messageBusSubscribe();
    await messageBus.setup();

    app.listen(config.PORT, function () {
        console.log(`-Hosting on port ${config.PORT}.`);
    });
}

_main();