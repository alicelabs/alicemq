const dotenv = require('dotenv').config();
const rabbit_url = process.env.RABBIT_API_URI
const fetch = require('node-fetch');

const apiController = {}

apiController.overview = (req, res) => {
  fetch(rabbit_url + '/overview')
  .then(result=>result.json())
  .then(data=> { 
    const { message_stats, cluster_name, queue_totals, object_totals } = data
    let result = { message_stats, cluster_name, queue_totals, object_totals }
    res.json(result)
  })
  .catch(err => console.error(err.stack))
} 

apiController.queues = (req, res) => {
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
    res.json(result)
  })
  .catch(err => console.error(err.stack))  
}

apiController.exchanges = (req, res) => {
  fetch(rabbit_url + '/exchanges')
  .then(result=>result.json())
  .then(data=> {
    const result = data.map(el => {
      const { message_stats, name, type, durable } = el
      return el = { message_stats, name, type, durable }
    })
    res.json(result)
  })
  .catch(err => console.error(err.stack))  
}

apiController.consumers = (req, res) => {
  fetch(rabbit_url + '/consumers')
  .then(result=>result.json())
.then(data => {
  const result = data.map(el => {
    const { arguments, channel_details, consumer_tag, queue } = el
    return el = { arguments, channel_details, consumer_tag, queue }
  })
  res.json(result)
})
  .catch(err => console.error(err.stack))  
}

apiController.channels = (req, res) => {
  fetch(rabbit_url + '/channels')
  .then(result =>result.json())
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
    res.json(result)
  })
  .catch(err => console.error(err.stack))  
}

apiController.onLoad = function(req, res) {
  const urls = [rabbit_url + '/overview', rabbit_url + '/exchanges', rabbit_url + '/queues', rabbit_url + '/consumers', rabbit_url + '/channels']

  Promise.all(urls.map(url => 
   new Promise((resolve, reject) =>
   fetch(url)
    .then(result => result.json())
    // .then(data => console.log(data))
    .then(data => resolve(data))
    ))
    )
    .then(result => {
      // return result order: overview, exchanges, queues, consumers, channels 
      let data = {}

      data.cluster_name = result[0].clustername
      data.queue_totals = result[0].queue_totals
      data.object_totals = result[0].object_totals
      data.message_stats = result[0].message_stats
      data.exchanges = result[1].map(el => {
        const { message_stats, name, type, durable } = el
        return el = { message_stats, name, type, durable }
      })
      data.queues = result[2].map(el => {
        const { message_stats, backing_queue_status, messages, messages_details, name, node, state } = el
        return el = { message_stats, backing_queue_status, messages, messages_details, name, node, state }       
      })
      data.consumers = []
      data.producers = [] 
      
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
      
      // console.log('this is the final result ', result)
      res.send(data)
    })
  
  
}
module.exports = apiController;