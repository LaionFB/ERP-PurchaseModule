const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('NeedToPurchaseSituation', {
	name: { type: Sequelize.STRING(20) },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
}, { sequelize: db, freezeTableName: true, tableName: 'NeedToPurchaseSituation' });

module.exports = model;