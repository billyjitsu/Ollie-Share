import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useMoralis } from "react-moralis";

const DistributionTableItem = ({data}) => {
    const {Moralis} = useMoralis();
  return <div>
      <Card>
    <Box sx={{display:'flex'}}>
        <Typography sx={{p:1, width:200}}>{data.name}</Typography>
        <Typography sx={{p:1}}>{data.contract}</Typography>
        <Typography sx={{p:1}}>{data.shares}</Typography>
        <Typography sx={{p:1}}>{data.balance? Moralis.Units.FromWei( data.balance._hex,18)  : "Loading..."}</Typography>
        <Typography sx={{p:1}}>{data.revenue? Moralis.Units.FromWei( data.revenue._hex,18)  : "Loading..."}</Typography>
    </Box>
    </Card>
  </div>;
};

export default DistributionTableItem;
