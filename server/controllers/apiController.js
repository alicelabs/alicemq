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
  .then(data => data.forEach(producer => {
    fetch(rabbit_url + '/channels/' + producer.name)
    .then(result =>result.json()
    .then(data => console.log(data.channel_details, data.queue)))
    })
  )
  .catch(err => console.error(err.stack))  
}

module.exports = apiController;