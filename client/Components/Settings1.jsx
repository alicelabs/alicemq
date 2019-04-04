import React, { Component } from 'react'
import Toggle from './Toggle.jsx'

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

  console.log(props.cluster_name)
  if (props.nodes) {
    producers = props.nodes.map((node) => {
      if (node.group === 1) {
        return <Toggle content={node.name} />
      }
    })

    exchanges = props.nodes.map((node) => {
      if (node.group === 2) {
        return <Toggle content={node.name} />
      }
    })

    queues = props.nodes.map((node) => {
      if (node.group === 3) {
        return <Toggle content={node.name} />
      }
    })

    consumers = props.nodes.map((node) => {
      if (node.group === 4) {
        return <Toggle content={node.name} />
      }
    })
  }


  return (
    <React.Fragment>
      <div className="nodes-1">
        <h3>Producers</h3>
        <ul className="noDots">{producers}</ul>
      </div>
      <div className="nodes-2">
        <h3>Exchanges</h3>
        <ul className="noDots">{exchanges}</ul>
      </div>
      <div className="nodes-3">
        <h3>Queues</h3>
        <ul className="noDots">{queues}</ul>
      </div>
      <div className="nodes-4">
        <h3>Consumers</h3>
        <ul className="noDots">{consumers}</ul>
      </div>
    </React.Fragment>
  )
}

export default Settings1;