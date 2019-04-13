import React, { Component } from 'react'
import Toggle from './Toggle.jsx'
import Typography from '@material-ui/core/Typography'

// d3Data reference

// "cluster_name": cluster_name,
// "nodes": [],
// "links": [],
// "producers": producers.length,
// "exchanges": exchanges.length,
// "queues": queues.length,
// "consumers": consumers.length



const Settings1 = (props) => {
  let queues = [];
  let exchanges = [];
  let consumers = [];
  let producers = [];

  if (props.nodes) {
    producers = props.nodes.map((node, i) => {
      if (node.group === 1) {
        return <Toggle key={i} content={node.name} />
      }
    })

    exchanges = props.nodes.map((node, i) => {
      if (node.group === 2) {
        return <Toggle key={i} ex="1" mute={props.mute} content={node.name} />
      }
    })

    queues = props.nodes.map((node, i) => {
      if (node.group === 3) {
        return <Toggle key={i} content={node.name} />
      }
    })

    consumers = props.nodes.map((node, i) => {
      if (node.group === 4) {
        return <Toggle key={i} content={node.name} />
      }
    })
  }


  return (
    <React.Fragment>
      <div className="nodes-1">
        <h3 className="roboto">Producers: {props.producers}</h3>
        <ul className="noDots">{producers}</ul>
      </div>
      <div className="nodes-2">
      <h3 className="roboto">Exchanges: {props.exchanges}</h3>
        <ul className="noDots">{exchanges}</ul>
      </div>
      <div className="nodes-3">
      <h3 className="roboto">Queues: {props.queues}</h3>
        <ul className="noDots">{queues}</ul>
      </div>
      <div className="nodes-4">
      <h3 className="roboto">Consumers: {props.consumers}</h3>
        <ul className="noDots">{consumers}</ul>
      </div>
    </React.Fragment>
  )
}

export default Settings1;