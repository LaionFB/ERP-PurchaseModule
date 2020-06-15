"use strict";

const db        = require('../../database/sequelize');

const model = db.define('providerProduct', {
}, { sequelize: db, freezeTableName: true });

let product = db.models['product'];
let provider = db.models['provider'];

product.belongsToMany(provider, { through: model });
provider.belongsToMany(product, { through: model });

module.exports = model;
