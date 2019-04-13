import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 0.2 + 'em',
  },
  pos: {
    marginBottom: 2,
  },
};


const OverviewCards = (props) => {

  return (
    <React.Fragment>
      
        <Card className="s1">
        <div className="ocard">
        <span className="card-title">
        Total Delivered<br />
        </span><span className="card-content">
        {props.message_stats.deliver_get}
        </span>
        </div>
        </Card>

        <Card className="s2">
        <div className="ocard">
        <span className="card-title">
        Published/s<br />
        </span><span className="card-content">
        {props.message_stats.publish_details.rate}
        </span>
        </div>
        </Card>

        <Card className="s3">
        <div className="ocard">
        <span className="card-title">
        Producers<br />
        </span><span className="card-content">
        {props.producers}
        </span>
        </div>
        </Card>

        <Card className="s4">
        <div className="ocard">
        <span className="card-title">
        Exchanges<br />
        </span><span className="card-content">
        {props.exchanges}
        </span>
        </div>
        </Card>

        <Card className="s5">
        <div className="ocard">
        <span className="card-title">
        In-Queue<br />
        </span><span className="card-content">
        {props.queue_totals.messages}
        </span>
        </div>
        </Card>

        <Card className="s6">
        <div className="ocard">
        <span className="card-title">
        Deliveries/s<br />
        </span><span className="card-content">
        {props.message_stats.deliver_get_details.rate}
        </span>
        </div>
        </Card>

        <Card className="s7">
        <div className="ocard">
        <span className="card-title">
        Consumers<br />
        </span><span className="card-content">
        {props.consumers}
        </span>
        </div>
        </Card>

        <Card className="s8">
        <div className="ocard">
        <span className="card-title">
        Queues<br />
        </span><span className="card-content">
        {props.queues}
        </span>
        </div>
        </Card>

     
    </React.Fragment>
  );
}

export default OverviewCards;