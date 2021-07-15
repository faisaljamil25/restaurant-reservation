import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from './table';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bookTable: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  booking: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
  },
  bookingDropdown: {
    width: '85%',
    padding: '4% 0',
    backgroundColor: 'red',
    color: 'white',
    margin: '2% 0',
    fontFamily: 'Roboto',
    fontSize: '1.1rem',
    border: 'none,',
    borderRadius: '5px',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: 'red',
      color: 'white',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    '&-menu': {
      outline: 'none',
    },

    '&-item:hover': {
      backgroundColor: 'white',
    },

    '&-item:active': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
  bookButton: {
    margin: theme.spacing(2),
  },
  tableDisplay: {
    backgroundColor: 'red',
    margin: '10% 2%',
    padding: '3% 5%',
    borderRadius: '25px',
  },
  tableCount: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Roboto, sans-serif',
  },
  tableKey: {
    paddingTop: '1%',
    paddingBottom: '4.5%',
    color: 'white',
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
  tableDisplayMsg: {
    color: 'white',
  },
}));

const Book = (props) => {
  const classes = useStyles();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [locationAnchor, setLocationAnchor] = React.useState(null);
  const [sizeAnchor, setSizeAnchor] = React.useState(null);
  const [totalTables, setTotalTables] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: 'Any Location',
    size: 0,
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // List of potential locations
  const [locations] = useState(['Any Location', 'Patio', 'Inside', 'Bar']);
  const [times] = useState([
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = (_) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date =
      months[selection.date.getMonth()] +
      ' ' +
      selection.date.getDate() +
      ' ' +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ':00' : time + ':00';
    console.log(time);
    const datetime = new Date(date + ' ' + time);
    return datetime;
  };

  const getEmptyTables = (_) => {
    let tables = totalTables.filter((table) => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async (_) => {
        let datetime = getDate();
        let res = await fetch(`${process.env.REACT_APP_BACKEND}/availability`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: datetime,
          }),
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          (table) =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== 'Any Location'
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async (_) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log('Incomplete Details');
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch(`${process.env.REACT_APP_BACKEND}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id,
        }),
      });
      res = await res.text();
      console.log('Reserved: ' + res);
      props.setPage(2);
    }
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  // Generate party size dropdown
  const getSizes = (_) => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <MenuItem
          key={i}
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </MenuItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = (_) => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <MenuItem
          key={loc}
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              location: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </MenuItem>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = (_) => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <MenuItem
          key={time}
          onClick={(_) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </MenuItem>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables state
  const getTables = (_) => {
    console.log('Getting tables');
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach((table) => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className={classes.bookTable}
      >
        <Grid item xs={12}>
          <Box className={classes.booking}>
            <Typography variant='h4'>
              {!selection.table.id ? 'Book a Table' : 'Confirm Reservation'}
            </Typography>
            <i
              className={
                !selection.table.id
                  ? 'fas fa-chair pizza-slice'
                  : 'fas fa-clipboard-check pizza-slice'
              }
            ></i>
          </Box>
          <Box className={classes.booking}>
            <Typography variant='h4'>
              {selection.table.id
                ? 'You are booking table ' + selection.table.name
                : null}
            </Typography>
          </Box>
          <Box className={classes.booking}>
            {reservationError ? (
              <Typography variant='h4'>
                * Please fill out all of the details.
              </Typography>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.booking}>
            <img src='/cafe.jpg' alt='cafe' width='500px' />
          </Box>
        </Grid>
      </Grid>

      {!selection.table.id ? (
        <div id='reservation-stuff'>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={3}>
              <input
                type='date'
                required='required'
                className={classes.bookingDropdown}
                value={selection.date.toISOString().split('T')[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(e.target.value),
                    };
                    setSelection(newSel);
                  } else {
                    console.log('Invalid date');
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                className={classes.bookingDropdown}
                aria-controls='time-menu'
                aria-haspopup='true'
                onClick={(event) => setTimeAnchor(event.currentTarget)}
              >
                {selection.time === null ? 'Select a Time' : selection.time}
              </Button>
              <Menu
                id='time-menu'
                anchorEl={timeAnchor}
                keepMounted
                open={Boolean(timeAnchor)}
                onClose={() => setTimeAnchor(null)}
              >
                {getTimes()}
              </Menu>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                className={classes.bookingDropdown}
                aria-controls='location-menu'
                aria-haspopup='true'
                onClick={(event) => setLocationAnchor(event.currentTarget)}
              >
                {selection.location}
              </Button>
              <Menu
                id='location-menu'
                anchorEl={locationAnchor}
                keepMounted
                open={Boolean(locationAnchor)}
                onClose={() => setLocationAnchor(null)}
              >
                {getLocations()}
              </Menu>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                className={classes.bookingDropdown}
                aria-controls='size-menu'
                aria-haspopup='true'
                onClick={(event) => setSizeAnchor(event.currentTarget)}
              >
                {selection.size === 0
                  ? 'Select a Party Size'
                  : selection.size.toString()}
              </Button>
              <Menu
                id='size-menu'
                anchorEl={sizeAnchor}
                keepMounted
                open={Boolean(sizeAnchor)}
                onClose={() => setSizeAnchor(null)}
              >
                {getSizes()}
              </Menu>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            className={classes.tableDisplay}
          >
            <Grid item xs={12}>
              {getEmptyTables() > 0 ? (
                <Typography className={classes.tableCount}>
                  {getEmptyTables()} available
                </Typography>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className={classes.tableKey}>
                      <span className={classes.emptyTable}></span> &nbsp;
                      Available &nbsp;&nbsp;
                      <span className={classes.fullTable}></span> &nbsp;
                      Unavailable &nbsp;&nbsp;
                    </div>
                    <Grid container justifyContent='center' alignItems='center'>
                      {getTables()}
                    </Grid>
                  </div>
                ) : (
                  <Typography className={classes.tableDisplayMsg}>
                    No Available Tables
                  </Typography>
                )
              ) : (
                <Typography className={classes.tableDisplayMsg}>
                  Please select a date and time for your reservation.
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <div id='confirm-reservation-stuff'>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >
            <Grid item xs={12} sm={3}>
              <input
                type='text'
                placeholder='Name'
                value={booking.name}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <input
                type='text'
                placeholder='Phone Number'
                value={booking.phone}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <input
                type='text'
                placeholder='Email'
                value={booking.email}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.bookButton}
              onClick={(_) => {
                reserve();
              }}
            >
              Book Now
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Book;
