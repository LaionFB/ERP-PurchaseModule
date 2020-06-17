"use strict";

const Sequelize 		= require('sequelize');
const db        		= require('../../database/sequelize');
const provider			= require('../provider/provider.model');
const product			= require('../product/product.model');
const quotation			= require('../quotation/quotation.model');
const purchaseSituation = require('./purchase-situation.model');

const model = db.define('purchase', {
	quantity: { type: Sequelize.INTEGER },
	price: { type: Sequelize.DECIMAL(10,2) },
	expectedDeliveryDate: { type: Sequelize.DATE },
	deliveryDate: { type: Sequelize.DATE },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });

model.belongsTo(purchaseSituation);
model.belongsTo(provider);
model.belongsTo(product);
model.belongsTo(quotation);

module.exports = model;
