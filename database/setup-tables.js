"use strict";

const db  = require('./sequelize');
const credentials   = require('./database.credentials');

module.exports = async () => {
    await db.sync({ alter: true });
    console.log(`-Database "${credentials.dbDatabase}" tables sync.`);
};