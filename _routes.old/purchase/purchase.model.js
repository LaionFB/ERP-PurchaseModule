const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

const model = db.define('Purchase', {
	quotationId: { type: Sequelize.INTEGER },
	providerId: { type: Sequelize.INTEGER },
	situationId: { type: Sequelize.INTEGER },
	code: { type: Sequelize.STRING(8) },
	deliverDate: { type: Sequelize.DATE },
	value: { type: Sequelize.DECIMAL(10, 2) },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
		
	//FOREIGN KEY (SituationId) REFERENCES PurchaseSituation(id),
	//FOREIGN KEY (QuotationId) REFERENCES Quotation(id),
	//FOREIGN KEY (ProviderId) REFERENCES Provider(id)
}, { sequelize: db, freezeTableName: true, tableName: 'Purchase' });

module.exports = model;
