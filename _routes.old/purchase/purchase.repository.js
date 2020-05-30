"use strict";

const Model      = require('./purchase.model');
const repository = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false } }).then(result => result.map(item => item.dataValues));

repository.getById = (id) => Model.findByPk(id).then(result => result && result.dataValues);

repository.getByCode = (code) => Model.findOne({ where: { code: code } }).then(result => result && result.dataValues);

repository.getByQuotationIdAndProviderId = (quotationId, providerId) => Model.findOne({ where: { quotationId: quotationId, providerId: providerId } }).then(result => result && result.dataValues);

repository.insert = (data) => Model.create(data).then(result => result.dataValues.id);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(result => result[0]);

repository.delete = (id) => Model.update({ isDeleted: true }, { where: { id: id } });

module.exports = repository;