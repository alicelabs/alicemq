#!/usr/bin/env node

// receiver of messages from rabbitmq
const amqp = require('amqplib/callback_api');

const URI = 'amqp://test:test@192.168.0.236:5672'

amqp.connect(URI, (err, conn) => {
  conn.createChannel((err, ch) => {
    let q = 'no_persist_new';

    ch.assertQueue(q, {durable: false}); // not durable/presistent message

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
    console.log(" User Post Received %s", msg.content.toString());
}, {noAck: true}); // no acknowledge means messages will "fire and forget"
  });
});