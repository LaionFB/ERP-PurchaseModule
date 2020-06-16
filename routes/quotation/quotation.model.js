"use strict";

const Sequelize 		 = require('sequelize');
const db        		 = require('../../database/sequelize');
const purchaseOrder		 = require('../purchase-order/purchase-order.model');
const provider			 = require('../provider/provider.model');
const quotationSituation = require('./quotation-situation.model');

const model = db.define('quotation', {
	quantity: { type: Sequelize.INTEGER },
	price: { type: Sequelize.DOUBLE(10,2) },
	isDeleted: { type: Sequelize.BOOLEAN },
	answerDate: { type: Sequelize.DATE }
}, { sequelize: db, freezeTableName: true });

model.belongsTo(quotationSituation);
model.belongsTo(purchaseOrder);
model.belongsTo(provider);

module.exports = model;
