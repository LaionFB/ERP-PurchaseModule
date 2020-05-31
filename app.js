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
const { PORT, NODE_ENV }  = require('./config');

const _main = async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(router());

    //await setupDatabase.syncDatabase();
    //await setupDatabase.syncTables();
    //await setupDatabase.syncData();

    messageBusSubscribe();
    await messageBus.setup();

    app.listen(PORT, function () {
        let production = !!NODE_ENV;
        console.log(`-Hosting on port ${PORT} in ${production ? 'PROD' : 'dev'} mode!`);
    });
}

_main();