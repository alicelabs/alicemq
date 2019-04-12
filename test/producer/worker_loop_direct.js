#!/usr/bin/env node

// send messages in a loop until manually quit or broken script 
const amqp = require('amqplib/callback_api');

const URI = 'amqp://test:test@192.168.0.236:5672'

amqp.connect(URI, (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'amq.direct'; // channel name
    const queue = 'direct_queue'

    ch.assertExchange(ex, 'direct', {durable: true});
    ch.assertQueue(queue, {durable: false}); // message is not persistent

    setInterval(() => {
      for(let i = 0; i < 1000; i++){
        ch.publish(ex, 'info', new Buffer.from(`${i}`), {persistent: false});
        // ch.sendToQueue(q, new Buffer.from(`${i}`), {persistent: false});
      }
      console.log(" [x] Message Sent");
    }, 200)
  });
});