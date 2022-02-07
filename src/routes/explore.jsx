import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { Box } from '@mui/system';

const Explore = () => {
  return <div>
  <ResponsiveAppBar/>
    <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Explore NFT Projects with Distributed Revenues</Typography>
    <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
      These are your distributed revenues received from NFT projects as a token holder.
    </Typography>
    <Box sx={{p:3}}>
    <Typography sx={{p:30}} align='center' variant='h5'>Coming soon, stay tuned.</Typography>
    </Box>
</div>;
};

export default Explore;