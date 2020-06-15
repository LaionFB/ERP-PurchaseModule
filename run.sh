#!/bin/bash
until nc -z ${RABBITMQ_HOST} ${RABBITMQ_PORT}; do
    echo nc -z ${RABBITMQ_HOST} ${RABBITMQ_PORT}
    echo "waiting for rabbit mq..."
    sleep 1
done
until nc -z ${SQL_SERVER_HOST} ${SQL_SERVER_PORT}; do
    echo nc -z ${SQL_SERVER_HOST} ${SQL_SERVER_PORT}
    echo "waiting for sql server..."
    sleep 1
done

npm start