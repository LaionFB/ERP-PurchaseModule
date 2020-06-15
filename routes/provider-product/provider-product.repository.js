"use strict";

const Model      = require('./provider-product.model');
const utils      = require('../../database/sequelize.utils');
const repository = {};

repository.getProducts = (providerId) => Model.findAll({ where: { providerId: providerId } }).then(utils.afterFindAll);

repository.getProviders = (productId) => Model.findAll({ where: { productId: productId } }).then(utils.afterFindAll);

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.delete = (providerId, productId) => Model.delete({ where: { providerId: providerId, productId: productId } }).then(utils.afterUpdate);

module.exports = repository;