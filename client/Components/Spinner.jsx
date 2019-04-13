import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = theme => ({
    // progress: {
    //     margin: theme.spacing.unit * 2
    // }
    // root: {
    //     flexGrow: 1,
    //   },
});

function Spinner(props){
    return (
        <div>
            <CircularProgress className="spinner" color="primary" size={100} />
            {/* <LinearProgress color="secondary" /> */}
        </div>
    )

}

export default withStyles(styles)(Spinner);