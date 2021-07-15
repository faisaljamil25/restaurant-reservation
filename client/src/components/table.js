import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Table = (props) => {
  const getRow1 = (_) => {
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs.push(
        <span
          key={i}
          className={props.empty ? 'empty-table' : 'full-table'}
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
          className={props.empty ? 'empty-table' : 'full-table'}
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div className='table-container'>
      <Grid
        container
        spacing={3}
        className={props.empty ? 'table selectable-table' : 'table'}
        onClick={(_) => {
          props.empty
            ? props.selectTable(props.name, props.id)
            : console.log('Tried to select a full table');
        }}
      >
        <Grid item xs={6} className='table-row'>
          <Paper className='text-center'>{getRow1()}</Paper>
        </Grid>
        <Grid item xs={6} className='table-row'>
          <Paper className='text-center'>{getRow2()}</Paper>
        </Grid>
        <Typography className='text-center table-name'>{props.name}</Typography>
      </Grid>
    </div>
  );
};

export default Table;
