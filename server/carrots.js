require('dotenv').config();
const rabbit_url = process.env.RABBIT_API_URI
const fetch = require('node-fetch');

const carrots = {};

carrots.overview = () => {
  return new Promise((res, rej) => {
    fetch(rabbit_url + '/overview')
    .then(result=>result.json())
    .then(data=> { 
      const { message_stats, cluster_name, queue_totals, object_totals } = data
      let result = { message_stats, cluster_name, queue_totals, object_totals }
      res(result); 
    })
    .catch(err => {console.error(err.stack); rej('Overview FAILED: ', err.stack)})  
  });
};

carrots.queues = () => {
  return new Promise((res, rej) => {
    fetch(rabbit_url + '/queues')
    .then(result=>result.json())
    .then(data => {
      const result = data.map(el => {
      return el = {
        "message_stats": el.message_stats,
        "messages_persistent": el.messages_persistent,
        "backing_queue_status": el.backing_queue_status,
        "messages": el.messages,
        "messages_details": el.messages_details,
        "name": el.name,
        "node": el.node,
        "state": el.state
        }
      })
      res(result);
    })
    .catch(err => {console.error(err.stack); rej('Queues FAILED: ', err.stack)})  
  });
};

carrots.exchanges = () => {
  return new Promise((res, rej) => {
    fetch(rabbit_url + '/exchanges')
    .then(result=>result.json())
    .then(data=> {
      const result = data.map(el => {
        const { message_stats, name, type, durable } = el

        let result = { message_stats, name, type, durable }
        if (!result.message_stats || !result.message_stats.publish_out) {
          result.message_stats = {
            "publish_in": 0,
            "publish_in_details": {
                "rate": 0
            },
            "publish_out": 0,
            "publish_out_details": {
                "rate": 0
            }
        }
          }
          return el = result;
        }
      )
      res(result);
    })
    .catch(err => {console.error(err.stack); rej('Exchanges FAILED: ', err.stack)})  
  });
};

carrots.consumers = () => {
  return new Promise((res, rej) => {
    fetch(rabbit_url + '/consumers')
    .then(result=>result.json())
    .then(data => {
        const result = data.map(el => {
          const obj = {
            arguments: el.arguments,
            channel_details: el.channel_details,
            consumer_tag: el.consumer_tag,
            queue: el.queue
          };
        return obj;
      });
      res(result);
    })
    .catch(err => {console.error(err.stack); rej('Consumers FAILED: ', err.stack)})  
  });
};

module.exports = carrots;