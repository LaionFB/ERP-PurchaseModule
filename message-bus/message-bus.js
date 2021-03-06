"use strict";

const amqp   = require('amqplib');
const config = require('../config');

let messageBus = {};

let _events     = {};
let _connection = null;
let _channel    = null;
let _isSetup    = false;

messageBus.subscribe = async (event, callback) => {
    if(_isSetup)
        throw new Error(`Can't subscribe to event "${event}" because service has already been started.`);

    _events[event] = callback;
};

messageBus.sendMessage = async (routingKey, message) => {
    if(!_isSetup)
        throw new Error(`Couldn't send message because message bus service hasn't been started yet.`);

    let payload = JSON.stringify(message);
    _channel.publish(config.RABBITMQ_EXCHANGE, routingKey, Buffer.from(payload));
    console.log(`RMQ: send event "${routingKey}" => message-length ${payload.length}`);
}

messageBus.setup = async () => {
    _connection = await amqp.connect(`amqp://${config.RABBITMQ_HOST}:${config.RABBITMQ_PORT}`);
    _channel    = await _connection.createChannel();

    await _channel.assertExchange(config.RABBITMQ_EXCHANGE, 'direct', { durable: true });
    await _channel.assertQueue(config.RABBITMQ_QUEUE, { durable: true });

    await Promise.all(
        Object.keys(_events).map(async (event) => {
            await _channel.bindQueue(config.RABBITMQ_QUEUE, config.RABBITMQ_EXCHANGE, event);
            console.log(`-RabbitMQ registered subscriber for event "${event}".`);
        })
    );

    await _channel.consume(config.RABBITMQ_QUEUE, async (msg) => {
        try{
            let { routingKey } = msg.fields;
            if(msg.content && _events[routingKey]){
                let message = msg.content.toString();
                console.log(`RMQ: received event "${routingKey}" => message-length ${message.length}`);
                await _events[routingKey](JSON.parse(message));
            }
            else
                console.log(`RMQ: REJECTED event "${routingKey}" with no subscriptions.`);
        } catch(e){
            console.error(e);
        }
    }, { noAck: true });
    
    _isSetup = true;
    console.log(`-RabbitMQ listening queue "${config.RABBITMQ_QUEUE}".`)
}

module.exports = messageBus;