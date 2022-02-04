import { Typography } from '@mui/material';
import React from 'react';

const TableRowTypo = ({input}) => {
  return <div>
      <Typography variant='h6' noWrap='true' sx={{width: "200px"}}>{input}</Typography>
  </div>;
};

export default TableRowTypo;
