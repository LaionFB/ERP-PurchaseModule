"use strict";

const sql           = require('mssql');
const db            = require('./sequelize');
const config        = require('../config');
const dataMigration = require('./data-migration.json');
const { models }    = require('./sequelize');

const setupDatabase = {};

setupDatabase.syncDatabase = async () => {
    let pool = await sql.connect({
        user: config.SQL_SERVER_USER,
        password: config.SQL_SERVER_PASSWORD,
        port: config.SQL_SERVER_PORT,
        server: config.SQL_SERVER_HOST,
        database: 'master',
        options: {
            encrypt: true,
            enableArithAbort: true
        }
    });
    let { recordset } = await pool.request().query(`
        IF NOT EXISTS (SELECT name 
                       FROM sysdatabases 
                       WHERE '[' + name + ']' = N'${config.SQL_SERVER_DATA_BASE}' 
                       OR name = N'${config.SQL_SERVER_DATA_BASE}')
        BEGIN
            CREATE DATABASE ${config.SQL_SERVER_DATA_BASE};
            SELECT 1 as result;
        END
        ELSE
            SELECT 0 as result;
    `);
    
    console.log(`-Database "${config.SQL_SERVER_DATA_BASE}" ${recordset[0].result ? 'CREATED' : 'already exists'}.`);
};

setupDatabase.syncTables = async () => {
    await db.sync({ alter: true });
    console.log(`-Database "${config.SQL_SERVER_DATA_BASE}" tables in sync.`);
};

setupDatabase.syncData = async () => {
    await Promise.all(
        Object.entries(dataMigration)
        .map(async ([entity, values]) => {
            let model = models[entity];
            let result = await Promise.all(values.map(x => model.findOrCreate({ where: x.pk, defaults: x.data })));
            let newEntries = result.filter(x => x[1]).length;
            if(newEntries)
                console.log(`-Added ${newEntries} entries on "${entity}".`);        
        })
    );
    console.log(`-Database "${config.SQL_SERVER_DATA_BASE}" data in sync.`);
}

module.exports = setupDatabase;