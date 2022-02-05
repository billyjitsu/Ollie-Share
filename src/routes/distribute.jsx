import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { Box, padding } from '@mui/system';
import { useState } from 'react';

const Distribute = () => {
  //States
  const [NFTContract, setNFTContract] = useState(null);
  const [NFTProjectName, setNFTProjectName] = useState(null);
  const [NFTOwners, setNFTOwners] = useState(null);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  
  function updateNFTContractAddress(e){
    setNFTContract(e.target.value);
    //console.log("User typed: "+ e.target.value);
  }

  function NFTContractAddressHandler(address){
    console.log("Submitting: " + address);
  }

  //Moralis Stuff
  const {Moralis} = useMoralis();
  const getNFTOwners = async (NFTAddress) => {
    const message = await Moralis.Web3API.token.getNFTOwners({chain: "mumbai",format: "decimal", address: NFTAddress});
    //console.log(message);
    const usefulData = message.result;
    let dataSize = usefulData.length;
    let ownerAddress = [dataSize];

    let projectName = usefulData[0]["name"];
    console.log("Project: " + projectName);
    setNFTProjectName(projectName);
    setNFTOwners(dataSize);
    setDataRetrieved(false);
    setDataRetrieved(true);

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
          {dataRetrieved?
            <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
              <TextField disabled id="outlined-read-only-input"
              label="NFT Project Name"
              defaultValue={NFTProjectName}
              InputProps={{
                readOnly: true,
              }} sx={{width:400, marginRight:4, marginTop:1}} variant='outlined'/>
              <TextField disabled id="outlined-read-only-input"
              label="Owners"
              defaultValue={NFTOwners}
              InputProps={{
                readOnly: true,
              }} sx={{width:120, marginRight:4, marginTop:1}} variant='outlined'/>
            </Box>: <h6></h6>
          }
          
          <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
            <TextField required id='nft-contract-address' label='NFT Contract Address (Polygon)' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}} onChange={updateNFTContractAddress}/>
            <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} onClick={async()=>{await getNFTOwners(NFTContract)}} >Retrieve</Button>
          </Box>
          {dataRetrieved?
            <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
              <TextField required id='distribute-amount' label='Distribute Amount (MATIC)' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}}/>
              <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} >Distribute</Button>
            </Box>: <h6></h6>
          }
        </Box>
      </Box>
    </Box>

</div>;
};

export default Distribute;