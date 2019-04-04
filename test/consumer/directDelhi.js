#!/usr/bin/env node

// receiver of messages from rabbitmq
const amqp = require('amqplib/callback_api');


const URI = 'amqp://test:test@192.168.0.236:5672'

const obj = {
  type: 'direct',
  exchange: 'chris.direct',
  binding: 'shark_queue',
};

amqp.connect(URI, (err, conn) => {
  conn.createChannel((err, ch) => {
    let q = 'shark_queue';

    ch.assertQueue(q, {durable: false}, (err, qu) => {
      ch.bindQueue(qu.queue, obj.exchange, obj.binding);

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", qu.queue);
      ch.consume(qu.queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }); // not durable/presistent message

    }, {noAck: true}); // no acknowledge means messages will "fire and forget"
  });
});