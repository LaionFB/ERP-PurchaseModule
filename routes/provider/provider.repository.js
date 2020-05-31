"use strict";

const Model      = require('./provider.model');
const utils      = require('../../database/sequelize.utils');
const repository = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false } }).then(utils.afterFindAll);

repository.getById = (id) => Model.findByPk(id).then(utils.afterFindOne);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(utils.afterUpdate);

module.exports = repository;