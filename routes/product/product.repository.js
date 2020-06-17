"use strict";

const Model      = require('./product.model');
const utils      = require('../../database/sequelize.utils');
const provider   = require('../provider/provider.model');
const repository = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false } }).then(utils.afterFindAll);

repository.getById = (id) => Model.findByPk(id, { include: { model: provider } }).then(utils.afterFindOne);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(utils.afterUpdate);

module.exports = repository;