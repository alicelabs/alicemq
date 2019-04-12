#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const URI = 'amqp://test:test@192.168.0.236:5672'

amqp.connect(URI, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        if(msg.content) {
        console.log(" [x] %s", msg.content.toString());
    }
      }, {noAck: true});
    });
  });
});