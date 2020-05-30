"use strict";

const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('Provider', {
	name: { type: Sequelize.STRING(20) },
	isDeleted: { type: Sequelize.BOOLEAN }
}, { sequelize: db, freezeTableName: true });
module.exports = model;
