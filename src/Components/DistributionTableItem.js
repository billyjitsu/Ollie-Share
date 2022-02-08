import { Button, Card, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useMoralis } from "react-moralis";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, 0)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


const DistributionTableItem = ({data, onWithdraw}) => {
    
    const {Moralis} = useMoralis();
  return <div>

    <Box sx={{backgroundColor:"white", p:1, display:'flex', justifyContent:'center'}}>


        
    <Accordion sx={{display:'flex', justifyContent:'center',  flexDirection: 'column'}} >
        <AccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        ><Box sx={{backgroundColor:"white", p:1, display:'flex', justifyContent:'space-evenly', width:'80vw'}}>
            <Box>
                <Typography variant='subtitle1' sx={{p:1}}>Project</Typography>
                <Typography variant='h6' sx={{p:1, width:200}}>{data.name? data.name: "Loading..."}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle1' sx={{p:1}}>Contract</Typography>
                <Typography variant='h6' noWrap={false} sx={{p:1}}>{data.contract}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle1' sx={{p:1}}>Tokens</Typography>
                <Typography variant='h6' sx={{p:1}}>{data.shares}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle1' sx={{p:1}}>Revenue</Typography>
                <Typography variant='h6' sx={{p:1}}>{data.revenue? Moralis.Units.FromWei( data.revenue._hex,18)  : " "}</Typography>
            </Box>
            <Box>
                <Typography variant='subtitle1' sx={{p:1}}>Balance</Typography>
                <Typography variant='h6' sx={{p:1}}>{data.balance? (parseFloat(Moralis.Units.FromWei( data.revenue._hex,18))- parseFloat(Moralis.Units.FromWei( data.balance._hex,18))).toFixed(4)  : " "}</Typography>
            </Box>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                <Button variant='contained' onClick={()=> onWithdraw(data.contract, (parseFloat(Moralis.Units.FromWei( data.revenue._hex,18))- parseFloat(Moralis.Units.FromWei( data.balance._hex,18))).toFixed(4))}>Withdraw</Button>
            </Box>
            
            
        </Box>
        </AccordionSummary>
        <AccordionDetails>
          
        {data.history? 

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Token Owned</TableCell>
                        <TableCell align="right">Pool</TableCell>
                        <TableCell align="right">Revenue&nbsp;(MATIC)</TableCell>
        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.history.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">{row.share}</TableCell>
                        <TableCell align="right">{row.pool}</TableCell>
                        <TableCell align="right">{row.payout}</TableCell>
              
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                : <h6> </h6>
                    }



        </AccordionDetails>
      </Accordion>
        
    </Box>
 
  </div>;
};

export default DistributionTableItem;
