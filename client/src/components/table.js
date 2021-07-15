import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tableName: {
    color: 'white',
  },
  table: {
    backgroundColor: 'rgba(245, 246, 250, 0.4)',
    padding: '15px',
    borderRadius: '25px',
    minWidth: '80px',
  },

  selectableTable: {
    cursor: 'pointer',
  },
  fullTable: {
    backgroundColor: 'white',
    border: 'solid 2px white',
    // border: 'solid 2px rgba(245, 246, 250, 0.4)',
    borderRadius: '50%',
    padding: '1px 10px',
    margin: '3px',
  },
  emptyTable: {
    backgroundColor: 'red',
    border: 'solid 2px white',
    borderRadius: '50%',
    padding: '1px 10px',
    margin: '3px',
  },
}));

const Table = (props) => {
  const classes = useStyles();
  const getRow1 = (_) => {
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs.push(
        <span
          key={i}
          className={
            props.empty ? `${classes.emptyTable}` : `${classes.fullTable}`
          }
        ></span>
      );
    }
    return chairs;
  };
  const getRow2 = (_) => {
    let chairs2 = [];
    for (var i = 0; i < Math.floor(props.chairs / 2); i++) {
      chairs2.push(
        <span
          key={i}
          className={
            props.empty ? `${classes.emptyTable}` : `${classes.fullTable}`
          }
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        className={
          props.empty
            ? `${classes.table} ${classes.selectableTable}`
            : `${classes.table}`
        }
        onClick={(_) => {
          props.empty
            ? props.selectTable(props.name, props.id)
            : console.log('Tried to select a full table');
        }}
      >
        <Grid item xs={6}>
          <Box>{getRow1()}</Box>
        </Grid>
        <Grid item xs={6}>
          <Box>{getRow2()}</Box>
        </Grid>
        <Typography className={classes.tableName}>{props.name}</Typography>
      </Grid>
    </div>
  );
};

export default Table;
