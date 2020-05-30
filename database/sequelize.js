"use strict";

const Sequelize     = require('sequelize');
const types         = require('sequelize/lib/data-types.js');
const setupDatabase = require('./setup-database');
const credentials   = require('./database.credentials');

types.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = new Sequelize(credentials.dbDatabase, credentials.dbUser, credentials.dbPassword, {
    dialect: 'mssql',
    host: credentials.dbHost,
    logging: () => {},
    dialectOptions: { options: { trustServerCertificate: true } }
});