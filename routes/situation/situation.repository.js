"use strict";

const purchaseOrderSituation = require('./purchase-order-situation.model');
const quotationSituation     = require('./quotation-situation.model');
const purchaseSituation      = require('./purchase-situation.model');
const utils                  = require('../../database/sequelize.utils');
const repository             = {};

repository.getPurchaseOrderSituations = () => purchaseOrderSituation.findAll().then(utils.afterFindAll);

repository.getQuotationSituations = () => quotationSituation.findAll().then(utils.afterFindAll);

repository.getPurchaseSituations = () => purchaseSituation.findAll().then(utils.afterFindAll);

module.exports = repository;