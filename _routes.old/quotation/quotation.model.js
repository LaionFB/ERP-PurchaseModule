const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('Quotation', {
	userId: { type: Sequelize.INTEGER },
	situationId: { type: Sequelize.INTEGER },
	limitDate: { type: Sequelize.DATE },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
	
	//FOREIGN KEY (UserId) REFERENCES SystemUser(id),
	//FOREIGN KEY (SituationId) REFERENCES QuotationSituation(id)
}, { sequelize: db, freezeTableName: true, tableName: 'Quotation' });

module.exports = model;
