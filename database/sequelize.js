"use strict";

const Sequelize     = require('sequelize');
const types         = require('sequelize/lib/data-types.js');
const config        = require('../config');

types.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const db = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    dialect: 'mssql',
    port: config.DB_PORT,
    host: config.DB_HOST,
    logging: () => {},
    dialectOptions: { options: { trustServerCertificate: true } }
});

module.exports = db;