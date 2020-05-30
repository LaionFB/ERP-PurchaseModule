#!/usr/bin/env node
"use strict";

const cors          = require('cors');
const express       = require('express');
const bodyParser    = require('body-parser');
const router        = require('./router');
const setupDatabase = require('./database/setup-database');
const setupTables   = require('./database/setup-tables');
const port          = process.env.PORT || 3030;

const _main = async () => {
    await setupDatabase();
    await setupTables();

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use(router);

    app.listen(port, function () {
        let production = !!process.env.NODE_ENV;
        console.log(`-Hosting on port ${port} in ${production ? 'PROD' : 'dev'} mode!`);
    });
}
_main();