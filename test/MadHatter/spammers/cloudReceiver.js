const amqp = require('amqplib/callback_api');
require('dotenv').config();
const uri = process.env.CATERPILLAR_URI
// const uri = process.env.CLOUD_AMQP

//type, exchange, binding, message,  uri
let obj = {
  type: 'topic',
  exchange: 'topex',
  binding: 'jimmy',
  message: 'message bound jimmy',
  uri: uri 
};

amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {

    var ex = 'topex';
    
    ch.assertExchange(obj.exchange, obj.type, {durable: false});
    ch.assertQueue(obj.binding, {exclusive: true}, (err, q)=> {
      console.log('.-. waiting for messages', q.queue);
      
      //arguments: queueName  - exchangeName - key
      ch.bindQueue(q.queue, ex, obj.binding);
      ch.consume(q.queue, function(msg){
        if (msg.content) {
          console.log('message:', msg.content.toString())
        } 
      }, {noAck: true})
    })
  })
})
