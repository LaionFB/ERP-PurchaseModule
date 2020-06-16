"use strict";

const Model              = require('./quotation.model');
const quotationSituation = require('./quotation-situation.model');
const utils              = require('../../database/sequelize.utils');
const repository         = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false }, include: 'quotationSituation' }).then(utils.afterFindAll);

repository.getById = (id) => Model.findByPk(id, { include: 'quotationSituation' }).then(utils.afterFindOne);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(utils.afterUpdate);


repository.getQuotationSituations = () => quotationSituation.findAll().then(utils.afterFindAll);

module.exports = repository;