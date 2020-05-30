"use strict";

const credentials = {
    dbHost     : 'localhost'         || process.env.DB_HOST,
    dbUser     : 'sa'                || process.env.DB_USER,
    dbPassword : 'Sa123456'          || process.env.DB_PASSWORD,
    dbDatabase : 'ERPPurchaseModule' || process.env.DB_DATABASE
}

module.exports = credentials;