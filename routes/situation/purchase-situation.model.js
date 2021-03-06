"use strict";

const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('purchaseSituation', {
	name: { type: Sequelize.STRING(20) }
}, { sequelize: db, freezeTableName: true });

module.exports = model;