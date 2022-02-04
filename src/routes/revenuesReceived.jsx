import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";


const RevenuesReceived = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  return <div>
    <ResponsiveAppBar/>
      <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Revenues Received</Typography>
      {isAuthenticated?
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
          These are your distributed revenues received from NFT projects as a token holder.
        </Typography>: 
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
        Please login to see revenues that you have received.
      </Typography>}
      
      
      <div style={{margin: "70px"}}>
        {isAuthenticated? <CollapsibleTable/>: <h2> </h2>}
       
       </div>
  </div>;
};

export default RevenuesReceived;
