"use strict";

const config = {
    PORT:                +process.env.PORT                 || 3030,
    API_GATEWAY_PATH:     process.env.API_GATEWAY_PATH     || '/',
    SQL_SERVER_HOST:      process.env.SQL_SERVER_HOST      || 'localhost',
    SQL_SERVER_PORT:     +process.env.SQL_SERVER_PORT      || 1433,
    SQL_SERVER_USER:      process.env.SQL_SERVER_USER      || 'sa',
    SQL_SERVER_PASSWORD:  process.env.SQL_SERVER_PASSWORD  || 'Sa123456',
    SQL_SERVER_DATA_BASE: process.env.SQL_SERVER_DATA_BASE || 'ERPPurchaseModule',
    RABBITMQ_HOST:        process.env.RABBITMQ_HOST        || 'localhost',
    RABBITMQ_PORT:       +process.env.RABBITMQ_PORT        || 5672,
    RABBITMQ_EXCHANGE:    process.env.RABBITMQ_EXCHANGE    || 'erp_message_bus',
    RABBITMQ_QUEUE:       process.env.RABBITMQ_QUEUE       || 'purchasing',
    DB_SYNC_DATABASE:     process.env.DB_SYNC_DATABASE     || 'Y',
    DB_SYNC_TABLES:       process.env.DB_SYNC_TABLES       || 'Y',
    DB_SYNC_DATA:         process.env.DB_SYNC_DATA         || 'Y'
};

module.exports = config;