"use strict";

const Sequelize 			 = require('sequelize');
const db        			 = require('../../database/sequelize');
const product			 	 = require('../product/product.model');
const purchaseOrderSituation = require('../situation/purchase-order-situation.model');

const model = db.define('purchaseOrder', {
	quantity: { type: Sequelize.INTEGER },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });

model.belongsTo(purchaseOrderSituation);
model.belongsTo(product);

module.exports = model;
