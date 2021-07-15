import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const Thankyou = () => {
  return (
    <div>
      <Grid container justifyContent='center' alignItems='center' spacing={3}>
        <Grid item xs={12}>
          <Typography className='thanks-header'>Thank You!</Typography>
          <i className='fas fa-pizza-slice thank-you-pizza'></i>
          <Typography className='thanks-subtext'>
            You should receive an email with the details of your reservation.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Thankyou;
