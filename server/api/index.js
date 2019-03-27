const dotenv = require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');
// const Websocket = require('ws');

const rabbit_url = process.env.RABBIT_API_URI

app.use(bodyParser.json())

app.get('/api/v1/overview', (req, res) => {
  console.log('inside get')
  fetch(rabbit_url + '/overview')
  .then(result=>result.json())
  .then(data=> console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/api/v1/exchanges', (req, res) => {
  fetch(rabbit_url + '/exchanges')
  .then(result=>result.json())
  .then(data=> console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/api/v1/queues', (req, res) => {
  fetch(rabbit_url + '/queues')
  .then(result=>result.json())
  .then(data=> console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/api/v1/consumers', (req, res) => {
  fetch(rabbit_url + '/consumers')
  .then(result=>result.json())
  .then(data => console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/api/v1/messages', (req, res) => {
  fetch(rabbit_url + '/messages')
  .then(result=>result.json())
  .then(data => console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/api/v1/channels', (req, res) => {
  fetch(rabbit_url + '/channels')
  .then(result =>result.json())
  .then(data => data.forEach(producer => {
    fetch(rabbit_url + '/channels/' + producer.name)
    .then(result =>result.json()
    .then(data => console.log(data.channel_details, data.queue)))
    })
  )
  .catch(err => console.error(err.stack))  
})

app.listen(3000, ()=> console.log('listening on port 3000'))