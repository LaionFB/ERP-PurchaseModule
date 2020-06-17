"use strict";

const Sequelize 		 = require('sequelize');
const db        		 = require('../../database/sequelize');
const purchaseOrder		 = require('../purchase-order/purchase-order.model');
const provider			 = require('../provider/provider.model');
const product			 = require('../product/product.model');
const quotationSituation = require('../situation/quotation-situation.model');

const model = db.define('quotation', {
	quantity: { type: Sequelize.INTEGER },
	price: { type: Sequelize.DECIMAL(10,2) },
	answerDate: { type: Sequelize.DATE },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });

model.belongsTo(quotationSituation);
model.belongsTo(purchaseOrder);
model.belongsTo(provider);
model.belongsTo(product);

module.exports = model;
