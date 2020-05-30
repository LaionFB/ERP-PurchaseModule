const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('QuotationProvider', {
	quotationId: { type: Sequelize.INTEGER },
	providerId: { type: Sequelize.INTEGER },
	answerDate: { type: Sequelize.DATE },
	situationId: { type: Sequelize.INTEGER }, 
	value: { type: Sequelize.DECIMAL(10, 2) },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }

	//FOREIGN KEY (SituationId) REFERENCES QuotationSituation(id),	
	//FOREIGN KEY (QuotationId) REFERENCES Quotation(id),
	//FOREIGN KEY (ProviderId) REFERENCES Provider(id)
}, { sequelize: db, freezeTableName: true, tableName: 'QuotationProvider' });

module.exports = model;
