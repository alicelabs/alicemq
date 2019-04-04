#!/usr/bin/env node

// send messages in a loop until manually quit or broken script 
const amqp = require('amqplib/callback_api');

const URI = 'amqp://test:test@192.168.0.236:5672'

amqp.connect(URI, (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'user_post'; // channel name

    ch.assertQueue(q, {durable: false}); // message is not persistent
    setInterval(() => {
      for(let i = 0; i < 10; i++){
        ch.sendToQueue(q, new Buffer.from(`${i}`), {persistent: false});
      }
      console.log("User Post sent");
    }, 200)
  });
});