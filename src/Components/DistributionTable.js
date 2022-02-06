import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DistributionTableItem from './DistributionTableItem';

const DistributionTable = ({data}) => {
  return <div>
      <Box>
          <Typography>tada</Typography>
          {data.map((n)=>(<DistributionTableItem data={n}/>))}

      </Box>
  </div>;
};

export default DistributionTable;
