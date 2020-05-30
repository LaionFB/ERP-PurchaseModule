USE ERPPurchaseModule;

CREATE TABLE Product(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

CREATE TABLE SystemUser(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	position VARCHAR(20),
	email VARCHAR(30),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

CREATE TABLE NeedToPurchaseSituation(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO NeedToPurchaseSituation VALUES
('Aberto', 0, getdate(), getdate()),
('Em cotação', 0, getdate(), getdate()),
('Aguardando entrega', 0, getdate(), getdate()),
('Finalizado', 0, getdate(), getdate()),
('Cancelado', 0, getdate(), getdate());

CREATE TABLE NeedToPurchase(
	id INT IDENTITY PRIMARY KEY,
	userId INT,
	isAutomatic BIT,
	productId INT,
	quantity DECIMAL(10, 3),
	limitDate DATETIME,
	situationId INT,
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
	
	FOREIGN KEY (UserId) REFERENCES SystemUser(id),
	FOREIGN KEY (ProductId) REFERENCES Product(id),
	FOREIGN KEY (SituationId) REFERENCES NeedToPurchaseSituation(id)
);

CREATE TABLE QuotationSituation(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO QuotationSituation VALUES
('Aberto', 0, getdate(), getdate()),
('Cotação feita', 0, getdate(), getdate()),
('Recusado', 0, getdate(), getdate()),
('Realizado', 0, getdate(), getdate()),
('Cancelado', 0, getdate(), getdate());

CREATE TABLE Quotation(
	id INT IDENTITY PRIMARY KEY,
	userId INT,
	situationId INT,
	limitDate DATETIME,
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
	
	FOREIGN KEY (UserId) REFERENCES SystemUser(id),
	FOREIGN KEY (SituationId) REFERENCES QuotationSituation(id)
);

CREATE TABLE QuotationNeedToPurchase(
	id INT IDENTITY PRIMARY KEY,
	quotationId INT,
	needToPurchaseId INT,
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
	
	FOREIGN KEY (QuotationId) REFERENCES Quotation(id),
	FOREIGN KEY (NeedToPurchaseId) REFERENCES NeedToPurchase(id)
);

CREATE TABLE Provider(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

CREATE TABLE QuotationProvider(
	id INT IDENTITY PRIMARY KEY,
	quotationId INT,
	providerId INT,
	answerDate DATETIME,
	situationId INT, 
	value DECIMAL(10, 2),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME

	FOREIGN KEY (SituationId) REFERENCES QuotationSituation(id),	
	FOREIGN KEY (QuotationId) REFERENCES Quotation(id),
	FOREIGN KEY (ProviderId) REFERENCES Provider(id)
);

CREATE TABLE PurchaseSituation(
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(20),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
);

INSERT INTO QuotationSituation VALUES
('Aguardando entrega', 0, getdate(), getdate()),
('Finalizado', 0, getdate(), getdate()),
('Cancelado', 0, getdate(), getdate());

CREATE TABLE Purchase(
	id INT IDENTITY PRIMARY KEY,
	quotationId INT,
	providerId INT,
	situationId INT,
	code varchar(8),
	deliverDate DATETIME,
	value DECIMAL(10, 2),
	isDeleted BIT DEFAULT 0,
	createdAt DATETIME,
	updatedAt DATETIME
		
	FOREIGN KEY (SituationId) REFERENCES PurchaseSituation(id),
	FOREIGN KEY (QuotationId) REFERENCES Quotation(id),
	FOREIGN KEY (ProviderId) REFERENCES Provider(id)
);