"use strict";

const Sequelize  = require('sequelize');
const connString = process.env.MSSQL_CONN_STRING || 'mssql://sa:Sa123456@localhost/ERPPurchaseModule';
const db         = new Sequelize(connString);





