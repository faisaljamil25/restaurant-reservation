import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Main = ({ setPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            If you're looking for great pizza
            <i className='fas fa-pizza-slice pizza-slice'></i>
          </Typography>
          <Button
            color='inherit'
            onClick={(_) => {
              setPage(1);
            }}
          >
            Book a Table
          </Button>
        </Grid>
        <Grid item xs={12}>
          <img src='/cafe.jpg' alt='cafe' />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
