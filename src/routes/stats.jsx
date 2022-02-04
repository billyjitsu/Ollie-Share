import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';

const Stats = () => {
    return <div>
    <ResponsiveAppBar/>
      <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Top NFT Projects</Typography>
      <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
        These are your distributed revenues received from NFT projects as a token holder.
      </Typography>
      
      <div style={{margin: "70px"}}>
       <CollapsibleTable/>
       </div>
  </div>;

};

export default Stats;
