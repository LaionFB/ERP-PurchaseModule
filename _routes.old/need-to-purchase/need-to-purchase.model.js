const Sequelize = require('sequelize');
const db        = require('../../database/sequelize');

module.exports = db.define('NeedToPurchase', {
	userId: { type: Sequelize.INTEGER },
	isAutomatic: { type: Sequelize.BOOLEAN },
	productId: { type: Sequelize.INTEGER },
	quantity: { type: Sequelize.DECIMAL(10, 3) },
	limitDate: { type: Sequelize.DATE },
	situationId: { type: Sequelize.INTEGER },
	isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
	
	//FOREIGN KEY (UserId) REFERENCES SystemUser(id),
	//FOREIGN KEY (ProductId) REFERENCES Product(id),
	//FOREIGN KEY (SituationId) REFERENCES NeedToPurchaseSituation(id)
}, { sequelize: db, freezeTableName: true, tableName: 'NeedToPurchase' });