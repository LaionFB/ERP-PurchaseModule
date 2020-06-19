"use strict";

const Sequelize     = require('sequelize');
const types         = require('sequelize/lib/data-types.js');
const config        = require('../config');

types.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const db = new Sequelize(config.SQL_SERVER_DATA_BASE, config.SQL_SERVER_USER, config.SQL_SERVER_PASSWORD, {
    dialect: 'mssql',
    port: config.SQL_SERVER_PORT,
    host: config.SQL_SERVER_HOST,
    logging: () => {},
    dialectOptions: { options: { trustServerCertificate: true, encrypt: true } }
});

module.exports = db;