"use strict";

const db       = require('../../database/sequelize');
const product  = require('../product/product.model');
const provider = require('../provider/provider.model');

const model = db.define('providerProduct', {
}, { sequelize: db, freezeTableName: true });

product.belongsToMany(provider, { through: model });
provider.belongsToMany(product, { through: model });

module.exports = model;
