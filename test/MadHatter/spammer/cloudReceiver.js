const amqp = require('amqplib/callback_api');
require('dotenv').config();
const uri = process.env.CATERPILLAR_URI
// const uri = process.env.CLOUD_AMQP

//type, exchange, binding, message,  uri
let obj = {
  type: 'fanout',
  exchange: 'hatsu',
  binding: 'b6',
  message: 'b6 on fanout',
  uri: uri 
};

amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {
    
    ch.assertExchange(obj.exchange, obj.type, {durable: false});
    ch.assertQueue(obj.binding, {exclusive: true}, (err, q)=> {
      console.log('.-. waiting for messages', q.queue);
      
      //arguments: queueName  - exchangeName - key
      ch.bindQueue(q.queue, obj.exchange, obj.binding);
      ch.consume(q.queue, function(msg){
        if (msg.content) {
          console.log('message:', msg.content.toString())
        } 
      }, {noAck: true})
    })
  })
})
