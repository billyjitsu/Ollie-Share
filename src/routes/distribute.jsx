import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { Box, padding } from '@mui/system';

const Distribute = () => {
  const {Moralis} = useMoralis();
  const getNFTOwners = async (NFTAddress) => {
    const message = await Moralis.Web3API.token.getNFTOwners({chain: "mumbai",format: "decimal", address: NFTAddress});
    const usefulData = message.result;
    let dataSize = usefulData.length;
    let ownerAddress = [dataSize];
    // for (let x in usefulData){
    //   usefulData.push(x["owner_of"]);
    // }
    for (let i=0; i < dataSize; i++){
      ownerAddress[i] = usefulData[i]["owner_of"];
    }
    console.log(ownerAddress);
    return ownerAddress;
  }
  return <div>
  <ResponsiveAppBar/>
    <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Distribute Revenues</Typography>
    <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
      Send and distribute revenues to all NFT owners.
    </Typography>
    
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ backgroundColor: 'white', border:'1px solid lightGrey', padding:10, margin:10, display: 'flex',
          justifyContent: 'center', maxWidth:1000, borderRadius:2, boxShadow: '2px 1px 10px 1px rgba(0, 0, 0, .1);'}}>
        <Box sx={{backgroundColor: 'white'}}>
        <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
            <TextField disabled id="outlined-read-only-input"
            label="NFT Project Name"
            defaultValue="Bored"
            InputProps={{
              readOnly: true,
            }} sx={{width:400, marginRight:4, marginTop:1}} variant='outlined'/>
            <TextField disabled id="outlined-read-only-input"
            label="Owners"
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }} sx={{width:120, marginRight:4, marginTop:1}} variant='outlined'/>
        </Box>
          <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
            <TextField required id='nft-contract-address' label='NFT Contract Address' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}}/>
            <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} >Retrieve</Button>
          </Box>
          <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
            <TextField required id='distribute-amount' label='Distribute Amount (MATIC)' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}}/>
            <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} >Distribute</Button>
          </Box>
        </Box>
      </Box>
    </Box>

</div>;
};

export default Distribute;