const dotenv = require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');

const username = process.env.RABBIT_USERNAME
const password = process.env.RABBIT_PASSWORD

app.use(bodyParser.json())

app.get('/overview', (req, res) => {
  url = "https://" + username + ":" + password + "@dinosaur.rmq.cloudamqp.com/api/overview";
  fetch(url, {
    method: 'GET',
  }
  )
  .then(result=>result.json())
  .then(data=> console.log(data))
  .catch(err => console.error(err.stack))  
})

app.get('/exchanges', (req, res) => {
})



app.listen(3000, ()=> console.log('listening on port 3000'))