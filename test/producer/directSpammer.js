#!/usr/bin/env node
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const directAP = ({ex, exType, msg, binding, times}) => {
    amqp.connect(process.env.CATERPILLAR_URI, function (err, conn) {
        console.log('--- CONNECTION ---');

        conn.createChannel(function (err, ch) {
            console.log('--- CHANNEL CREATED ---');

            ch.assertExchange(ex, exType, { durable: false });
            for(let i = 0; i < times; i++){
                ch.publish(ex, binding, new Buffer.from((msg+i).toString()));
                console.log(" [x] Sent %s: '%s'", binding, i);
            }

            // setTimeout(function() { conn.close(); process.exit(0) }, 500);
        });
    });
}

const obj = {
    ex: 'chris.direct', 
    exType: 'direct', 
    msg: 'Hello Alice. Welcome to Wonderland...', 
    binding: 'shark_queue', 
    times: 1000};

directAP(obj);
