import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ setpage }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <Typography
            variant='h4'
            className={classes.title}
            onClick={() => {
              setpage(0);
            }}
          >
            Pizza House
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
