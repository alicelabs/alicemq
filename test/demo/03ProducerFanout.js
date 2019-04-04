#!/usr/bin/env node

// send messages in a loop until manually quit or broken script 
const amqp = require('amqplib/callback_api');

const URI = 'amqp://test:test@192.168.0.236:5672'

amqp.connect(URI, (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.assertExchange('amq.fanout', 'fanout', {durable: true});
    let msg = 'Notify User'
    setInterval(() => {
      for(let i = 0; i < 10; i++){
        ch.publish('amq.fanout', '', new Buffer.from(msg));
      }
      console.log("Notification sent");
    }, 200)
  });
});