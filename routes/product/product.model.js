"use strict";

const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('Product', {
	name: { type: Sequelize.STRING(20) },
	price: { type: Sequelize.DECIMAL(10, 2) },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });
module.exports = model;
