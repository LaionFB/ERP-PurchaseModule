"use strict";

const sql           = require('mssql');
const credentials   = require('./database.credentials');

module.exports = async () => {
    try {
        await sql.connect(`mssql://${credentials.dbUser}:${credentials.dbPassword}@${credentials.dbHost}/master`);
        const { recordset } = await sql.query(`            
            IF(db_id(N'${credentials.dbDatabase}') IS NULL)
            BEGIN
                CREATE DATABASE ${credentials.dbDatabase};
                SELECT 1 as result;
            END
            ELSE
                SELECT 0 as result;
        `);
        console.log(`-Database "${credentials.dbDatabase}" ${recordset[0].result ? 'CREATED' : 'already exists'}.`);
    } catch (e) {
        console.error(e);
    }
};