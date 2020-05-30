"use strict";

const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('PurchaseOrder', {
	productId: { type: Sequelize.INTEGER },
	quantity: { type: Sequelize.INTEGER },
	situationId: { type: Sequelize.INTEGER },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });

module.exports = model;
