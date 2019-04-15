import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = theme => ({
    // progress: {
    //     margin: theme.spacing.unit * 2
    // },
    // root: {
    //     flexGrow: 1,
    //   },
});

function Spinner(props){
    return (
        <div className="spinner">
            <CircularProgress color="primary" size={100} id="spin"/>
            {/* <LinearProgress color="primary" /> */}
        </div>
    )

}

export default withStyles(styles)(Spinner);