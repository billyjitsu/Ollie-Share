import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TableLabel } from './TableElement';
import ReleaseButton from './ReleaseButton';

import { useMoralis } from "react-moralis";

function createData(name, contract, shares, balance, revenue) {
  return {
    name,
    contract,
    shares,
    balance,
    revenue,
    history: [
      {
        date: '2020-01-05',
        distId: '11091700',
        shares: 3,
      },
      {
        date: '2020-01-02',
        distId: 'Anonymous',
        shares: 1,
      },
    ],
  };
}

function Row(props) {
  const {Moralis} = useMoralis();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"><Typography variant='h6' noWrap={true}>{row.name}</Typography></TableCell>
        <TableCell align="left"><Typography variant='h6' noWrap={true} sx={{width: "200px"}}>{row.contract}</Typography></TableCell>
        <TableCell align="center"><Typography variant='h6'>{row.shares}</Typography></TableCell>
        <TableCell align="center"><Typography variant='h6'>{row.revenue? Moralis.Units.FromWei( row.revenue._hex,18)  : "Loading..."}</Typography></TableCell>
        <TableCell align="center"><ReleaseButton/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle2" gutterBottom component="div" style={{"font-weight": "bold"}}>
                Distribution History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Distribution ID</TableCell>
                    <TableCell align="right">Shares</TableCell>
                    <TableCell align="right">Total Revenue (MATIC)</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.distId}</TableCell>
                      <TableCell align="right">{historyRow.shares}</TableCell>
                      <TableCell align="right">
                       WHAT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    contract: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        shares: PropTypes.number.isRequired,
        distId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    revenue: PropTypes.number.isRequired,

  }).isRequired,
};
//const rows = [];
// const rows = [
//   createData('Ollies Audition Tape', "0x6FA8291a2DEf477CA5Af262F00a2d33e3770052e", 0.5, 0.1, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({rows}) {
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><TableLabel><Typography variant='h6' sx={{"font-weight": "bold"}}>NFT PROJECT</Typography></TableLabel></TableCell>
            <TableCell align="left"><TableLabel><Typography variant='h6' sx={{"font-weight": "bold"}}>CONTRACT</Typography></TableLabel></TableCell> 
            <TableCell align="center"><TableLabel><Typography variant='h6' sx={{"font-weight": "bold"}}>Amount&nbsp;(MATIC)</Typography></TableLabel></TableCell>
            <TableCell align="center"><TableLabel><Typography variant='h6' sx={{"font-weight": "bold"}}>BALANCE&nbsp;(MATIC)</Typography></TableLabel></TableCell>
            <TableCell align="center"><TableLabel><Typography variant='h6' sx={{"font-weight": "bold"}}>ACTION</Typography></TableLabel></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows? rows.map((row) => (
            <Row key={row.name} row={row} />
          )): "Loading"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
