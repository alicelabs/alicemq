import React from 'react';
import Card from '@material-ui/core/Card';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';

const styles = {
  card: {
    minWidth: 275,
    minHeight: 100,
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

// const typographyOptions = {};
// const caption = { 
//   fontFamily:'\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',
//   color:'rgba(0, 0, 0, 0.54)',
//   htmlFontSize: 20,
//   fontSize: '3rem',
//   fontWeight:500,
//   lineHeight: '1.3rem' 
// };
//  typographyOptions.caption = caption;

const cardTheme = createMuiTheme({ 
  typography: {
    useNextVariants: true,
    typographyOptions: { 
      fontFamily:'\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',
      color:'rgba(0, 0, 0, 0.54)',
      htmlFontSize: 20,
      fontSize: '3rem',
      fontWeight:500,
      lineHeight: '1.3rem' 
    },
  } 
});


const OverviewCards = (props) => {

  return (
    <MuiThemeProvider theme={cardTheme}>
      
        <Card className="s1">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Total Delivered
        </Typography>
            <Typography variant="h5"  color='inherit'>
              {numeral(`${props.message_stats.deliver_get}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s2" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Published/s
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
            {/* TODO: Bug, publish_details is undefined after rabbit resets with no messages */}
              {numeral(`${props.message_stats.publish_details.rate}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s3" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Total Published
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.message_stats.publish}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s4" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Total NoAck
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.message_stats.deliver_no_ack}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s5" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              In-Queue
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.queue_totals.messages}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s6" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Deliveries/s
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.message_stats.deliver_get_details.rate}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s7" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Total Redelivered
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.message_stats.redeliver}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>

        <Card className="s8" border={1} borderColor="secondary.main">
          <CardContent>
            <Typography color='inherit' gutterBottom>
              Disk Writes
        </Typography>
            <Typography variant="h5" component="h2" color='inherit'>
              {numeral(`${props.message_stats.disk_writes}`).format('0,0')}
            </Typography>
          </CardContent>
        </Card>
    </MuiThemeProvider>
  );
}

export default OverviewCards;