import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
const NodeCards = (props) => {
let cards = [];
  props.nodecards.forEach((card) => {
    cards.push( <React.Fragment>
    <Card className="nodecard">
      <CardContent>
        <Typography color='inherit' gutterBottom>
          {Object.keys(card)[0]}
    </Typography>
        <Typography variant="h5" component="h2" color='inherit'>
        {Object.values(card)[0]}
        </Typography>
      </CardContent>
    </Card>
    </React.Fragment>)
  })


 
  return (
    <div className="nodecards">
    {cards}
    </div>
   )
 }

export default withStyles(styles)(NodeCards);