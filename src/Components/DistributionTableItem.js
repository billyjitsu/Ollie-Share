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
                <Typography variant='h6' sx={{p:1}}>{data.balance? parseFloat(Moralis.Units.FromWei( data.revenue._hex,18))- parseFloat(Moralis.Units.FromWei( data.balance._hex,18))  : " "}</Typography>
            </Box>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                <Button variant='contained' onClick={()=> onWithdraw(data.contract, parseFloat(Moralis.Units.FromWei( data.revenue._hex,18))- parseFloat(Moralis.Units.FromWei( data.balance._hex,18)))}>Withdraw</Button>
            </Box>
            
            
        </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
        
    </Box>
 
  </div>;
};

export default DistributionTableItem;
