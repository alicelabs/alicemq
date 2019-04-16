const fetch = require('node-fetch');
import { Base64 } from 'js-base64';



/**
 * This will parse the data from RabbitMQ API and gather all data of interest
 * 
 * @param {Object} config 
 */

// takes credentials from a user and instantiates connection with rabbitmq
function Carrot(config) {
  this.host = config.host;
  this.username = config.username;
  this.password = config.password;
  this.port = config.port;
  this.isWeb = config.isWeb

  // This "credentials" options is needed for /api/bindings CORS issue
  if (config.isWeb) {
    this.options = {
      method: 'GET',
      credentials: 'include'
    }
  } else {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + Base64.encode(`${config.username}:${config.password}`));
    this.options = {
      method: 'GET',
      headers: headers,
    }
  }

  // Port is needed for user hosted server
  if (config.port)
    // this.uri = `http://${config.username}:${config.password}@${config.host}:${config.port}/api`;
    this.uri = `http://${config.host}:${config.port}/api`;
  else
    this.uri = `http://${config.username}:${config.password}@${config.host}/api`;
}


//Queries for HTTP api endpoints
////////////////////////////////////////////////////////////////////////////////////////////////

Carrot.prototype.overview = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/overview', this.options)
      .then(result => result.json())
      .then(data => {
        const { message_stats, cluster_name, queue_totals, object_totals } = data
        let result = { message_stats, cluster_name, queue_totals, object_totals }
        res(result);
      })
      .catch(err => { console.error(err.stack); rej('Overview FAILED: ', err.stack) })
  });
};


Carrot.prototype.queues = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/queues', this.options)
      .then(result => result.json())
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
      .catch(err => { console.error(err.stack); rej('Queues FAILED: ', err.stack) })
  });
};

Carrot.prototype.exchanges = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/exchanges', this.options)
      .then(result => result.json())
      .then(data => {
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
          return result;
        }
        )
        res(result);
      })
      .catch(err => { console.error(err.stack); rej('Exchanges FAILED: ', err.stack) })
  });
};

Carrot.prototype.consumers = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/consumers', this.options)
      .then(result => result.json())
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
      .catch(err => { console.error(err.stack); rej('Consumers FAILED: ', err.stack) })
  });
};

Carrot.prototype.channels = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/channels', this.options)
      .then(result => result.json())
      .then(data => {
        let result = {
          producers: [],
          consumers: []
        }
        data.forEach(el => {
          if (el.consumer_count === 0) {
            let producer = {
              "message_stats": el.message_stats,
              "name": el.name,
              "state": el.state
            }
            result.producers.push(producer)
          }
          if (el.consumer_count === 1) {
            let consumer = {
              "message_stats": el.message_stats,
              "name": el.name,
              "state": el.state
            }
            result.consumers.push(consumer)
          }
        })
        res(result);
      })
      .catch(err => { console.error(err.stack); rej('Channels FAILED: ', err.stack) })
  });
};

Carrot.prototype.bindings = function () {
  return new Promise((res, rej) => {
    fetch(this.uri + '/bindings', this.options)
      .then(res => res.json())
      .then(data => {
        let result = []
        data.forEach(el => {
          let binding = {
            "exchange_name": el.source,
            "queue_name": el.destination
          }
          result.push(binding)
        })
        res(result)
      })
      .catch(err => { console.error(err.stack); rej('Bindings FAILED: ', err.stack) })
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////


// returns combined queries to send to frontend
Carrot.prototype.motherLoad = function () {
  return new Promise((res, rej) => {
    const urls = [this.uri + '/overview', this.uri + '/exchanges', this.uri + '/queues', this.uri + '/consumers', this.uri + '/channels', this.uri + '/bindings'];

    Promise.all(urls.map(url =>
      new Promise((resolve, reject) =>
        fetch(url, this.options)
          .then(result => result.json())
          .then(data => resolve(data))
          .catch(err => {reject( new Error(err))})
      )
    ))
      .then(result => {
        // return result order: overview, exchanges, queues, consumers, channels, bindings 
        let data = massageData(result);
        
        res(data);
      })
      .catch(err => { rej(err) })
  });
}

// private helper function to parse relevant information for further processing
function massageData(result) {
  const data = {};
  data.cluster_name = result[0].cluster_name
  data.queue_totals = result[0].queue_totals
  data.object_totals = result[0].object_totals
  data.message_stats = result[0].message_stats
  data.exchanges = result[1].map(el => {
    const { message_stats, name, type, durable } = el
    let result = { message_stats, name, type, durable }
    if (!result.message_stats || !result.message_stats.publish_out) {
      result.message_stats = {
        //in case no message stats exist / hardcode
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
    return result; 
  })

  data.queues = result[2].map(el => {
    const { message_stats, backing_queue_status, messages, messages_details, name, node, state } = el;
    const result = { message_stats, backing_queue_status, messages, messages_details, name, node, state }
    if (!result.message_stats) {
      //default 
      result.message_stats = {
        "ack": 0,
        "ack_details": {
            "rate": 0
        },
        "deliver": 0,
        "deliver_details": {
            "rate": 0
        },
        "deliver_get": 0,
        "deliver_get_details": {
            "rate": 0
        },
        "deliver_no_ack": 0,
        "deliver_no_ack_details": {
            "rate": 0
        },
        "get": 0,
        "get_details": {
            "rate": 0
        },
        "get_no_ack": 0,
        "get_no_ack_details": {
            "rate": 0
        },
        "publish": 0,
        "publish_details": {
            "rate": 0
        },
        "redeliver": 0,
        "redeliver_details": {
            "rate": 0
        }
      }
    }
    return el = result;
  })

  data.consumers = []
  data.producers = []
  data.bindings = []

  result[4].forEach(el => {
    if (el.consumer_count === 0) {
      let producer = {
        "message_stats": el.message_stats,
        "name": el.name,
        "state": el.state
      }
      data.producers.push(producer)
    }
    if (el.consumer_count === 1) {
      let consumer = {
        "message_stats": el.message_stats,
        "name": el.name,
        "state": el.state
      }
      data.consumers.push(consumer)
    }
  })

  data.consumers.forEach(consumer => {
    result[3].forEach(el => {
      if (el.channel_details.name == consumer.name) {
        consumer.queue = el.queue.name
      }
    })
  })
  result[5].forEach(b => {
    let binding = {
      "exchange_name": b.source,
      "queue_name": b.destination
    }
    data.bindings.push(binding)
  })

  
  return data;
}

export default Carrot;
