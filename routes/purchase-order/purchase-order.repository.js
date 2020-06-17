"use strict";

const Model                  = require('./purchase-order.model');
const purchaseOrderSituation = require('../situation/purchase-order-situation.model');
const utils                  = require('../../database/sequelize.utils');
const repository             = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false }, include: ['purchaseOrderSituation', 'product'] }).then(utils.afterFindAll);

repository.getById = (id) => Model.findByPk(id, { include: ['purchaseOrderSituation', 'product'] }).then(utils.afterFindOne);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(utils.afterUpdate);


repository.getPurchaseOrderSituations = () => purchaseOrderSituation.findAll().then(utils.afterFindAll);

module.exports = repository;