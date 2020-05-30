const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('Product', {
	name: { type: Sequelize.STRING(20) },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
}, { sequelize: db, freezeTableName: true, tableName: 'Product' });

module.exports = model;
