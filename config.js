"use strict";

const config = {
    PORT:         +process.env.PORT         || 3030,
    NODE_ENV:      process.env.NODE_ENV     || null,
    DB_HOST:       process.env.DB_HOST      || 'localhost',
    DB_PORT:      +process.env.DB_PORT      || 4000,
    DB_USER:       process.env.DB_USER      || 'sa',
    DB_PASSWORD:   process.env.DB_PASSWORD  || 'TCCpurchase01',
    DB_DATABASE:   process.env.DB_DATABASE  || 'ERPPurchaseModule',
    RMQ_HOST:      process.env.RMQ_HOST     || 'amqp://localhost',
    RMQ_PORT:     +process.env.RMQ_PORT     || 5672,
    RMQ_EXCHANGE:  process.env.RMQ_EXCHANGE || 'erp_exchange',
    RMQ_QUEUE:     process.env.RMQ_QUEUE    || 'purchasing'
};

module.exports = config;