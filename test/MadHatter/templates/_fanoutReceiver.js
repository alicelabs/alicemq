#!usr/bin/env node
//using an exchange and using fanout borker type

const amqp = require('amqplib/callback_api');
require('dotenv').config();
const uri = process.env.CATERPILLAR_URI
// const uri = process.env.CLOUD_AMQP

amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {

    var ex = 'fanex';
    
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.assertQueue('', {exclusive: true}, (err, q)=> {
      console.log('.-. waiting for messages', q.queue);
      
      //arguments: queueName  - exchangeName - key
      ch.bindQueue(q.queue, ex, '');
      ch.consume(q.queue, function(msg){
        if (msg.content) {
          console.log('message:', msg.content.toString())
        } 
      }, {noAck: true})
    })
  })
})

