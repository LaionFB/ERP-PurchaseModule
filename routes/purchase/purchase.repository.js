"use strict";

const Model             = require('./purchase.model');
const purchaseSituation = require('../situation/purchase-situation.model');
const utils             = require('../../database/sequelize.utils');
const repository        = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false }, include: ['purchaseSituation', 'product', 'provider'] }).then(utils.afterFindAll);

repository.getById = (id) => Model.findByPk(id, { include: ['purchaseSituation', 'product', 'provider'] }).then(utils.afterFindOne);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(utils.afterUpdate);


repository.getPurchaseSituations = () => purchaseSituation.findAll().then(utils.afterFindAll);

module.exports = repository;