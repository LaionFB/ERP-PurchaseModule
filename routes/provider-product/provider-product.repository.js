"use strict";

const Model      = require('./provider-product.model');
const utils      = require('../../database/sequelize.utils');
const repository = {};

repository.insert = (data) => Model.create(data).then(utils.afterInsert);

repository.delete = (providerId, productId) => Model.destroy({ where: { providerId: providerId, productId: productId } });

module.exports = repository;