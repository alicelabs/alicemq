import Carrot from './carrot-input.js';

function BlueBottle(config) {
  this.carrot = new Carrot(config);
  this.carrotData = undefined;
}

BlueBottle.prototype.getData = async function () {
  this.carrotData = await this.carrot.motherLoad();
  return carrot2D3(this.carrotData);
}

// private helper functions
function carrot2D3(carrotData) {
  const {
    queue_totals,
    message_stats,
    producers,
    exchanges,
    queues,
    consumers,
    bindings,
    cluster_name
  } = carrotData;

  let calcWidth = (window.innerWidth * 60) / 100
  let calcHeight = (window.innerHeight * 80) / 100

  const d3Data = {
    "queue_totals": queue_totals,
    "message_stats": message_stats,
    "cluster_name": cluster_name,
    "nodes": [],
    "links": [],
    "producers": producers.length,
    "exchanges": exchanges.length,
    "queues": queues.length,
    "consumers": consumers.length,
    "width": calcWidth,
    "height": calcHeight
  };

  function buildNodes(nodeType, groupNumber) {
    let total = nodeType.length
    nodeType.forEach((type, i) => {
      let node = {
        "message_stats": type.message_stats,
        "state": type.state,
        "type": type.type || "non-exchange",
        "name": type.name,
        "group": groupNumber,
        "y": (d3Data.height / 4) * groupNumber - (d3Data.height * 0.1),
        "x": Math.floor((d3Data.width / total) * (i + 1) - (d3Data.width / (total * 2))),
        "r": (d3Data.height / total) / 8
      }
      d3Data.nodes.push(node)
    })
  }

  function linkConsumersToQueues(c, q) {
    c.forEach((consumer) => {
      const queueName = consumer.queue
      d3Data.nodes.forEach((node, j) => {
        if (node.name === queueName && node.group === 3) {
          if (consumer.state === 'idle') {
            consumer.message_stats = {
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
            }
          }

          // TODO: BUG, deliver_get_details undefined when we only have a consumer/receiver
          const link = {
            "source": j,
            "target": d3Data.nodes.findIndex(el => el.name === consumer.name),
            "weight": Math.floor(Math.log(consumer.message_stats.deliver_get_details.rate)),
            // TODO: IMPROVE, the center coordinate depends on the width and height and update auto
            "xCenter": 25,
            "yCenter": 25,
            "sourceXCenter": 40, 
            "sourceYCenter": 25, 
          }
          d3Data.links.push(link)
        }
      })
    })
  }

  function linkExchangeToQueues(b, q) {
    b.forEach((binding) => {
      const exchangeName = binding.exchange_name
      d3Data.nodes.forEach((node, i) => {
        if (node.name === exchangeName && node.group === 2) {
          let currentExchange = exchanges[exchanges.findIndex(el => el.name === exchangeName)]
          
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
            "weight": message_rate,
            // TODO: IMPROVE, the center coordinate depends on the width and height and update auto
            "xCenter": 40,
            "yCenter": 25,
            "sourceXCenter": 0, 
            "sourceYCenter": 0, 
          }
          d3Data.links.push(link)
        }
      })
    })
  }

  function linkFanoutExchangesToAllQueues(e) {
    e.forEach(exchange => {
      const exchangeIndex = d3Data.nodes.findIndex(el => exchange.name === el.name)
      if (exchange.type === "fanout") {
        d3Data.nodes.forEach((node, i) => {
          let link;
          if (node.group === 3) {
            let message_rate = Math.floor(Math.log(exchange.message_stats.publish_out_details.rate))
            if (message_rate < 0) {
              message_rate = 1
            }
            link = {
              "source": exchangeIndex,
              "target": i,
              "weight": message_rate,
            // TODO: IMPROVE, the center coordinate depends on the width and height and update auto
              "xCenter": 40,
              "yCenter": 25,
              "sourceXCenter": 0, 
              "sourceYCenter": 0, 
            }
            d3Data.links.push(link)
          }

        })
      }
    })
  }

  buildNodes(producers, 1);
  buildNodes(exchanges, 2);
  buildNodes(queues, 3);
  buildNodes(consumers, 4);
  linkConsumersToQueues(consumers, queues);
  linkExchangeToQueues(bindings, queues);
  linkFanoutExchangesToAllQueues(exchanges);

  return d3Data
}

export default BlueBottle;