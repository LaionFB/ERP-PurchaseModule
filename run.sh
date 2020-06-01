#!/bin/bash
until nc -z ${RMQ_HOST} ${RMQ_PORT}; do
    echo nc -z ${RMQ_HOST} ${RMQ_PORT}
    echo "waiting for rabbit mq..."
    sleep 1
done
until nc -z ${DB_HOST} ${DB_PORT}; do
    echo nc -z ${DB_HOST} ${DB_PORT}
    echo "waiting for sql server..."
    sleep 1
done

npm start