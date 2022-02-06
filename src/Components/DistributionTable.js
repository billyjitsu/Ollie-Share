import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DistributionTableItem from './DistributionTableItem';

const DistributionTable = ({data, onWithdraw}) => {
  return <div>
      <Box>

          {data.map((n)=>(<DistributionTableItem data={n} onWithdraw={onWithdraw}/>))}

      </Box>
  </div>;
};

export default DistributionTable;
