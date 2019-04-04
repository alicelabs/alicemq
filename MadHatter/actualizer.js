const dotenv = require('dotenv').config();
// const uri = process.env.CLOUD_AMQP
const uri = process.env.CATERPILLAR_URI
const amqp = require('amqplib/callback_api');

//type, exchange, binding, message,  uri
let obj = {
  type: 'topic',
  exchange: 'topex',
  binding: 'red-rabbits',
  message: 'message on topex from Christian',
  uri: uri 
};


let spammer = function(obj) {
  let {type, exchange, binding, message, uri} = obj;

  amqp.connect(uri, (err, conn) => {
    conn.createChannel((err, ch) => {
      
      ch.assertExchange(exchange, type, {durable: false});
      ch.publish(exchange, binding, new Buffer.from(message));
      console.log('.-. message sent', message)
      
    });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500)
    // setTimeout(function() { conn.close() }, 1000)
  }) 
} 


let bound = spammer.bind(this, obj); 
const actualizer = function (obj, timer){
  return setInterval(bound, timer)
}
  
actualizer(obj, 30);

