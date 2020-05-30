"use strict";

const ampq           = require('amqplib');
const connString     = process.env.RABBITMQ_CONN_STRING || "amqp://localhost";
const ampqConnection = ampq.connect(connString);

let utils = {};

utils.sendMessage = async (queue, message) => {
    let connection = await ampqConnection;
    let channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });

    console.log(`RMQ send: ${queue} <= ${JSON.stringify(message)}`);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

utils.subscribe = async (queue, callback) => {
    let connection = await ampqConnection;
    let channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, async (msg) => {
        try{
            if(msg.content){
                console.log(`RMQ receive: ${queue} => ${msg.content.toString()}`);
                await callback(JSON.parse(msg.content.toString()));
                channel.ack(msg, false);
            }
        } catch(e){
            console.error(e);
        }
    });
}

module.exports = utils;