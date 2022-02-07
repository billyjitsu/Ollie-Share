import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DataTable from '../Components/DataTable';
import { getNFTOptions, getReleasedOptions, getAmountOptions, releaseOption, shareDistributionLengthOption,payeeShareAtDistributionOption, totalDistributedShares, distributedSum } from '../Components/ScData';
import DistributionTable from '../Components/DistributionTable';
import DistributionTableItem from '../Components/DistributionTableItem';
import { Box } from '@mui/system';


const RevenuesReceived = (props) => {


  return <div>
    <ResponsiveAppBar/>
      <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Top NFT Projects</Typography>
      {true?
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
          These are top NFT projects that distribute revenues to all token holders.
        </Typography>: 
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
        Please login to see revenues that you have received.
      </Typography>}
      
      <Box sx={{p:3}}>
    <Typography sx={{p:30}} align='center' variant='h5'>Coming soon, stay tuned.</Typography>
    </Box>
  </div>;
};

export default RevenuesReceived;
