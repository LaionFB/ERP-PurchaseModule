"use strict";

const Sequelize 			 = require('sequelize');
const db        			 = require('../../database/sequelize');
const purchaseOrderSituation = require('./purchase-order-situation.model');

const model = db.define('purchaseOrder', {
	productId: { type: Sequelize.INTEGER },
	quantity: { type: Sequelize.INTEGER },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });

model.belongsTo(purchaseOrderSituation);

module.exports = model;
