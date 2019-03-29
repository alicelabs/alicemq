const dotenv = require('dotenv').config();
const express = require('express');
const apiController = require('../controllers/apiController')
const app = express();
const bodyParser = require('body-parser');
// const Websocket = require('ws');

const rabbit_url = process.env.RABBIT_API_URI

app.use(bodyParser.json())

app.get('/api/v1/overview', apiController.overview)

app.get('/api/v1/exchanges', apiController.exchanges)

app.get('/api/v1/queues', apiController.queues)

app.get('/api/v1/consumers', apiController.consumers)  

// app.get('/api/v1/messages', apiController.messages)

app.get('/api/v1/channels', apiController.channels)

app.get('/api/v1/onload', apiController.onLoad)

app.get('/api/v1/bindings', apiController.bindings)

app.listen(3000, ()=> console.log('listening on port 3000'))