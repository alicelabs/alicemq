#!usr/bin/env node
//using an exchange and using fanout borker type

const amqp = require('amqplib/callback_api');
require('dotenv').config();
// const uri = process.env.CATERPILLAR_URI
const uri = process.env.CLOUD_AMQP


amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {
    
    var ex = 'fanex';
    var msg = process.argv.slice(2).join(' ') || 'Hello_World';
    
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log('.-. message sent', msg)
    
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500)
})

export default fanoutSender;