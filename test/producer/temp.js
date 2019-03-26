#!/usr/bin/env node
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const directAP = ({ex, exType, msg, binding, times}) => {
    amqp.connect(process.env.RABBIT_API_URI, function (err, conn) {
        conn.createChannel(function (err, ch) {
            console.log('')
            ch.assertExchange(ex, exType, { durable: false });
            for(let i = 0; i < times; i++){
                ch.publish(ex, binding, new Buffer.from(msg));
            }
            console.log(" [x] Sent %s: '%s'", binding, msg);
        });

        conn.close();
        process.exit(0);
    });
}

const obj = {ex: 'exchange1', exType: 'fanout', msg: 'Hello Alice.', binding: '', times: 10};

directAP(obj);
