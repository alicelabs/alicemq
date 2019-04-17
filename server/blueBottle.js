import Carrot from './carrot-input.js';
// BlueBottle is the library for parsing data for D3

/**
 * This will parse the data from Carrot and prepare it for D3
 * 
 * @param {Object} config 
 *
 * @output {Object} d3Data
 * 
 */

// Pass the config data to Carrot
function BlueBottle(config) {
  this.carrot = new Carrot(config);
  this.carrotData = undefined;

}

BlueBottle.prototype.getData = async function () {
  try {
    this.carrotData = await this.carrot.motherLoad();
  }
  catch (e) {
    throw e;
  }
  return carrot2D3(this.carrotData);
}

// private helper functions: parsing data ready for D3
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

  // Preparing a canvas
  //if canvas smaller than 950px, stretch to full width  
  let calcWidth = window.innerWidth < 950 ? (window.innerWidth) : (window.innerWidth * 62) / 100;
  let calcHeight = window.innerWidth < 950 ? (parent.innerHeight) * 90 / 100 : (parent.innerHeight)

  // Provides the app the state for D3
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
    "height": calcHeight,
    "identifiers": {}
  };

  function createIdentifiers(bindings) {
    bindings.forEach((x) => {
      if (x.exchange_name === "") x.exchange_name = 'default';
      d3Data.identifiers[x.queue_name] = x.exchange_name;
    })
  }

  function giveNametoDefaultExchange(nodes) {
    nodes.forEach((x) => {
      if (x.name === "") x.name = 'default';
    })
  }
  // (producers-> 1);
  // (exchanges-> 2);
  // (queues-> 3);
  // (consumers-> 4);

  // Prepares coordinate data for SVG object
  function buildNodes(nodeType, groupNumber) {
    let total = nodeType.length
    nodeType.forEach((type, i) => {
      let idt;
      if (groupNumber === 1 || groupNumber === 4) {
        if (!type.message_stats) {
          type.message_stats = { "publish_details": { "rate": 0 } }
        }
      }


      if (groupNumber === 2) type.name === "" ? idt = 'default' : idt = type.name;
      else if (groupNumber === 3) d3Data.identifiers[type.name] ? idt = d3Data.identifiers[type.name] : idt = 'other' //idt = d3Data.identifiers[type.name];
      else if (groupNumber === 4) d3Data.identifiers[type.queue] ? idt = d3Data.identifiers[type.queue] : idt = 'other';
      else idt = 'other'

      if (!type.message_stats) {
        type.message_stats = {
          "confirm": 0,
          "confirm_details": {
            "rate": 0
          },
          "publish": 0,
          "publish_details": {
            "rate": 0
          },
          "return_unroutable": 0,
          "return_unroutable_details": {
            "rate": 0
          },
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
          "redeliver": 0,
          "redeliver_details": {
            "rate": 0
          }
        }
      }
      let node = {

        "message_stats": type.message_stats,
        "identifier": idt,
        "state": type.state,
        "type": type.type || "non-exchange",
        "name": type.name,
        "group": groupNumber,
        "y": (d3Data.height / 4) * groupNumber - (d3Data.height * 0.1),
        "x": Math.floor((d3Data.width / total) * (i + 1) - (d3Data.width / (total * 2))),
        "r": (d3Data.height / total) / 10,
      }
      d3Data.nodes.push(node)
    })
  }

  // Prepares the edges between consumers and queues
  function linkConsumersToQueues(c, q) {

    c.forEach((consumer) => {
      const queueName = consumer.queue
      d3Data.nodes.forEach((node, j) => {
        if (node.name === queueName && node.group === 3) {
          if (!consumer.message_stats.deliver_get_details) {
            consumer.message_stats.deliver_get_details = {"rate": 0 }
            consumer.message_stats.deliver_get = 0;
          }

          const link = {
            "source": j,
            "target": d3Data.nodes.findIndex(el => el.name === consumer.name),
            "weight": consumer.message_stats.deliver_get_details.rate,
            // TODO: IMPROVE, the center coordinate depends on the width and height and update auto
            "xCenter": d3Data.width / 40,
            "yCenter": d3Data.height / 40,
            "sourceXCenter": d3Data.width / 40,
            "sourceYCenter": d3Data.height / 30,
          }
          d3Data.links.push(link)
        }
      })
    })
  }

  // Prepares the edges between exchanges and queues
  function linkExchangeToQueues(b, q) {
    b.forEach((binding) => {
      const queueName = binding.queue_name;
      const echangeName = binding.exchange_name;
      d3Data.nodes.forEach((node, i) => {
        if (node.name === queueName && node.group === 3) {
          let currentQueue = queues[queues.findIndex(el => el.name === queueName)]
          let currentExchange = exchanges[exchanges.findIndex(el => el.name === echangeName)]

          if (!currentQueue.message_stats) {
            currentQueue.message_stats = { "publish_details": { "rate": 0 } }
          }
          if (!currentQueue.message_stats.publish_details) {
            currentQueue.message_stats.publish_details = { "rate": 0 }
          }

          let message_rate = Math.min(currentQueue.message_stats.publish_details.rate, currentExchange.message_stats.publish_out_details.rate)
          // Handles the case it will draw a negative line so we assign 1 to avoid that
          if (message_rate < 0) {
            message_rate = 1
          }
          const link = {
            "target": i,
            "source": d3Data.nodes.findIndex(el => {
              if (el.group === 2) {
                return el.name === binding.exchange_name
              }
            }),
            "weight": message_rate,
            // TODO: IMPROVE, the center coordinate depends on the width and height and update auto
            "xCenter": d3Data.width / 40,
            "yCenter": d3Data.height / 40,
            "sourceXCenter": 0,
            "sourceYCenter": 0,
          }
          d3Data.links.push(link)
        }
      })
    })
  }

  function fixOverviewMessageStats(e) {
    if (!e.message_stats.deliver_get) {
      e.message_stats.deliver_get = 0
    }
    if (!e.message_stats.deliver_get_details) {
      e.message_stats.deliver_get_details = { "rate": 0 }
    }
    if (!e.message_stats.publish_details) {
      e.message_stats.publish_details = { "rate": 0 }
    }
  }
  createIdentifiers(bindings);
  giveNametoDefaultExchange(exchanges);
  buildNodes(producers, 1);
  buildNodes(exchanges, 2);
  buildNodes(queues, 3);
  buildNodes(consumers, 4);
  linkConsumersToQueues(consumers, queues);
  linkExchangeToQueues(bindings, queues);
  fixOverviewMessageStats(d3Data);

  return d3Data
}

export default BlueBottle;


