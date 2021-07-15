import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pizza: {
    display: 'flex',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const Main = ({ setPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box className={classes.pizza}>
          <Typography variant='h5'>
            If you're looking for great pizza
          </Typography>
          <i className='fas fa-pizza-slice pizza-slice'></i>
        </Box>
        <Box mb={4}>
          <Button
            variant='contained'
            color='secondary'
            onClick={(_) => {
              setPage(1);
            }}
          >
            Book a Table
          </Button>
        </Box>
        <Box>
          <img src='/cafe.jpg' alt='cafe' width='500px' />
        </Box>
      </Box>
    </div>
  );
};

export default Main;
