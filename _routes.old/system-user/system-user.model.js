const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('SystemUser', {
	name: { type: Sequelize.STRING(20) },
	position: { type: Sequelize.STRING(20) },
	email: { type: Sequelize.STRING(30) },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
}, { sequelize: db, freezeTableName: true, tableName: 'SystemUser' });

module.exports = model;
