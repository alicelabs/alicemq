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
    marginBottom: 0,
  },
};
const NodeCards = (props) => {
let cards = [];
  props.nodecards.forEach((card, i) => {
    cards.push( <React.Fragment>
    <Card id={'s' + (i + 9)}>
      <CardContent>
        <Typography color='inherit' gutterBottom>
          {Object.keys(card)[0]}
    </Typography>
        <Typography variant="h5" component="p" color='inherit'>
        {numeral(Object.values(card)[0]).format("0,0") === '0' ? Object.values(card)[0] : numeral(Object.values(card)[0]).format("0,0")}
        </Typography>
      </CardContent>
    </Card>
    </React.Fragment>)
  })
 
  return (
    <React.Fragment>
       {cards}
    </React.Fragment>
   
   
   )
 }

export default withStyles(styles)(NodeCards);