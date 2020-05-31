"use strict";

const sql           = require('mssql');
const db            = require('./sequelize');
const config        = require('../config');
const dataMigration = require('./data-migration.json');
const { models }    = require('./sequelize');

const setupDatabase = {};

setupDatabase.syncDatabase = async () => {
    let pool = await sql.connect({
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        port: config.DB_PORT,
        server: config.DB_HOST,
        database: 'master',
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    });
    let { recordset } = await pool.request().query(`            
        IF(db_id(N'${"ERPPurchaseModule"}') IS NULL)
        BEGIN
            CREATE DATABASE ${"ERPPurchaseModule"};
            SELECT 1 as result;
        END
        ELSE
            SELECT 0 as result;
    `);
    
    console.log(`-Database "${"ERPPurchaseModule"}" ${recordset[0].result ? 'CREATED' : 'already exists'}.`);
};

setupDatabase.syncTables = async () => {
    await db.sync({ alter: true });
    console.log(`-Database "${config.DB_DATABASE}" tables in sync.`);
};

setupDatabase.syncData = async () => {
    await Promise.all(
        Object.entries(dataMigration)
        .map(async ([entity, values]) => {
            let model = models[entity];
            let result = await Promise.all(values.map(x => model.findOrCreate({ where: { id: x.id }, defaults: x })));
            let newEntries = result.filter(x => x[1]).length;
            if(newEntries)
                console.log(`-Added ${newEntries} entries on "${entity}".`);        
        })
    );
}

module.exports = setupDatabase;