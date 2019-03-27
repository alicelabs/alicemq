#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var uri = process.env.CATTERPILLAR_URI

amqp.connect(uri, function(err, conn) {
  conn.createChannel(function(err, ch) {
    console.log(process.argv)
    var ex = 'direct_logs';
    var args = process.argv.slice(2);
    var msg = args.slice(1).join(' ') || 'Hello World!';
    var severity = (args.length > 0) ? args[0] : 'info';

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, severity, new Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", severity, msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});