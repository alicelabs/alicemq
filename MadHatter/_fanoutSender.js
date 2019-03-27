#!usr/bin/env node
//using an exchange and using fanout borker type

const amqp = require('amqplib/callback_api');
var uri = process.env.CATTERPILLAR_URI

amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {
    
    var ex = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello_World';
    
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log('.-. message sent', msg)
    
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500)
})