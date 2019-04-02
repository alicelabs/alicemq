const amqp = require('amqplib/callback_api');
require('dotenv').config();
const uri = process.env.CATERPILLAR_URI
// const uri = process.env.CLOUD_AMQP

amqp.connect(uri, (err, conn) => {
  conn.createChannel((err, ch) => {

    var ex = 'topex';
    
    ch.assertExchange(ex, 'topic', {durable: false});
    ch.assertQueue('red-rabbits', {exclusive: true}, (err, q)=> {
      console.log('.-. waiting for messages', q.queue);
      
      //arguments: queueName  - exchangeName - key
      ch.bindQueue(q.queue, ex, 'red-rabbits');
      ch.consume(q.queue, function(msg){
        if (msg.content) {
          console.log('message:', msg.content.toString())
        } 
      }, {noAck: true})
    })
  })
})

