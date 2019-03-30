const onLoadData = require('../../test/onLoad.json')

const { producers, exchanges, queues, consumers, bindings } = onLoadData;


const d3Data = { "nodes": [], "links": []}

function buildNodes(nodeType, groupNumber) {
  let total = nodeType.length
  nodeType.forEach((type, i) => {
    let node = {
      "name": type.name,
      "group": groupNumber,
      "x": (800 / 4) * groupNumber - 75,
      "y": Math.floor((500 / total) * (i+1) - 20)
    }
    d3Data.nodes.push(node)
  })
}

buildNodes(producers, 1)
buildNodes(exchanges, 2)
buildNodes(queues, 3)
buildNodes(consumers, 4)


function linkConsumersToQueues(c, q) {
  c.forEach((consumer) => {
    const queueName = consumer.queue
    d3Data.nodes.forEach((node, j)=>{
      if (node.name === queueName && node.group === 3) {
        const link = {
          "source": j,
          "target": d3Data.nodes.findIndex(el => el.name === consumer.name),
          "weight": Math.floor(Math.log(consumer.message_stats.deliver_get_details.rate))
        }
        d3Data.links.push(link)
      }
    })
  })
}

function linkExhcnageToQueues(b, q) {
  b.forEach((binding) => {
    const exchangeName = binding.exchange_name
    d3Data.nodes.forEach((node, i)=>{
      if (node.name === exchangeName && node.group === 2) {
        let currentExchange = exchanges[exchanges.findIndex(el=> el.name === exchangeName)]
        let message_rate = Math.floor(Math.log(currentExchange.message_stats.publish_out_details.rate))
        if (message_rate < 0) {
          message_rate = 1
        }
        const link = {
          "source": i,
          "target": d3Data.nodes.findIndex(el => { 
            if (el.group === 3) {
              return el.name === binding.queue_name
            }
          }),
          "weight": message_rate
        }
        d3Data.links.push(link)
      }
    })
  })
}

function linkFanoutExchangesToAllQueues(e) {
  e.forEach(exchange=> {
    const exchangeIndex = d3Data.nodes.findIndex(el=> exchange.name === el.name)
    if (exchange.type === "fanout") {
      d3Data.nodes.forEach((node, i)=>{
        let link;
        if (node.group === 3) { 
          let message_rate = Math.floor(Math.log(exchange.message_stats.publish_out_details.rate))
          if (message_rate < 0) {
            message_rate = 1
          }
            link = {
              "source": exchangeIndex,
              "target": i,
              "weight": message_rate
            }
            d3Data.links.push(link)
          } 
          
        })
      }
      })   
}

linkConsumersToQueues(consumers, queues)
linkExhcnageToQueues(bindings, queues)
linkFanoutExchangesToAllQueues(exchanges)

module.exports = d3Data;