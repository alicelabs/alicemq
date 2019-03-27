#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const dotenv = require('dotenv').config();
var uri = process.env.CATERPILLAR_URI

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  process.exit(1);
}

amqp.connect(uri, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'topex';

    ch.assertExchange(ex, 'topic', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      //key here is the binding key
      args.forEach(function(key) {
        //name of queue - name of exhange - name of binding key
        ch.bindQueue(q.queue, ex, key);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});