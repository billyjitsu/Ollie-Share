import React from 'react';
import { Button, InputLabel, TextField, Typography } from '@mui/material';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { Box } from '@mui/system';
import { useState } from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ceil } from 'mathjs';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Distribute = () => {
  //States
  const [NFTContract, setNFTContract] = useState(null);
  const [NFTProjectName, setNFTProjectName] = useState(null);
  const [NFTOwners, setNFTOwners] = useState(null);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [network, setNetwork] = useState(null);
  const [isUpdatingNFTContract, setIsUpdatingNFTContract] = useState(false);
  var [uniqueNFTOwners, setUniqueNFTOwners] = useState(['1','2','3']); //TODO no idea why this isn't working :(
  var [holderShareCount, setHolderShareCount] = useState([1,2,3,4]);
  var [sharePool, setSharePool] = useState(0);
  var [distributionAmount, setDistributionAmount]=useState(null);
  
  function updateNFTContractAddress(e){
    setNFTContract(e.target.value);
    //console.log("User typed: "+ e.target.value);
  }

  function handleChangeNetwork(e){
    setNetwork(e.target.value);
  }

  async function handleChangeAmount(e){
    await setDistributionAmount(e.target.value);
    distributionAmount = e.target.value;
    console.log("Distributing: " + distributionAmount);
  }

  function distributeHandler(){
    console.log("Showing Unique owners only: " +uniqueNFTOwners);
  }

  function updateUniqueNFTOwners(data){
    console.log(data);
    setUniqueNFTOwners(data);
    uniqueNFTOwners= data;
    console.log(uniqueNFTOwners);
  }

  //generate share count for each owners
  function generateShareCount(allTokenOwners){
      const counts = {};
      allTokenOwners.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      console.log(counts)

      let shareCount = Object.values(counts);
      console.log(shareCount);

      updateHolderShareCount(shareCount);

  }

  function updateHolderShareCount(data){
    setHolderShareCount(data);
    holderShareCount = data
    console.log("Let's see");
    console.log(holderShareCount);
  }


  //Moralis Stuff
  const {Moralis} = useMoralis();
  const getNFTOwners = async (NFTAddress, NFTNetwork) => {
    setIsUpdatingNFTContract(true);

    const message = await Moralis.Web3API.token.getNFTOwners({chain: NFTNetwork,format: "decimal", address: NFTAddress});
    //console.log(message);

    //push array to allNFT first
    let ownerAddress = [message.result.length];
    for (let i=0; i < message.result.length; i++){
      ownerAddress[i] = message.result[i]["owner_of"];
    }

    let totalNFT = message.total;

    if(totalNFT>500){
      //get total page required
      let lastPage = ceil(totalNFT/500);
      //let cursor = message.cursor;
      let offset = 500;
      for(let j=1; j < lastPage; j++){
        let res = await Moralis.Web3API.token.getNFTOwners({chain: NFTNetwork,format: "decimal", address: NFTAddress, offset: offset});
        offset+= 500;
        let nextOwnerAddress = [res.result.length];
          for (let k=0; k < res.result.length; k++){
            nextOwnerAddress[k] = res.result[k]["owner_of"];
          }
          ownerAddress = ownerAddress.concat(nextOwnerAddress);
      }

    } else {
      //do the usual processing
    }

    setSharePool(ownerAddress.length);
    sharePool = ownerAddress.length;
    console.log("Total share pool: " + sharePool);
    //console.log(ownerAddress);
    generateShareCount(ownerAddress);
    let uniqueOwners = [...new Set(ownerAddress)];
    //get project details
    let projectName = message.result[0]["name"];
    //console.log("Project: " + projectName);
    setNFTProjectName(projectName);

    setNFTOwners(uniqueOwners.length);

    setDataRetrieved(false);
    setDataRetrieved(true);

    setIsUpdatingNFTContract(false);

    updateUniqueNFTOwners(uniqueOwners);
    return ownerAddress;
  }

  const scAddDistributedPayment = async (NFTAddress, address, shares, totalSharePool, amount) => {
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "addDistributedPayment",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "account",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "share",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "totalShares",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "paymentAmount",
            "type": "uint256"
          }
        ],
        "name": "addDistributedPayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params:{
        contractAddress: NFTAddress,
        account: address,
        share: shares,
        totalShares: totalSharePool,
        paymentAmount: Moralis.Units.ETH(amount)
      },
      msgValue: Moralis.Units.ETH(amount)
    }
    let message = await Moralis.executeFunction(options);
    console.log("From SMART CONTRACT:" + message);
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
            <InputLabel id="networkt-label">Network</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={network}
              label="Select Network"
              onChange={handleChangeNetwork}
              sx={{width:400}}
              variant="standard"
            >
              <MenuItem value={"eth"}>Ethereum Mainnet</MenuItem>
              <MenuItem value={"rinkeby"}>Rinkeby Test Network</MenuItem>
              <MenuItem value={"polygon"}>Polygon</MenuItem>
              <MenuItem value={"mumbai"}>Mumbai Testnet</MenuItem>
            </Select>
          </Box> 
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
            <TextField required id='nft-contract-address' label='NFT Contract Address' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}} onChange={updateNFTContractAddress}/>
            {isUpdatingNFTContract?
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{padding:1.8, marginTop:1, width:120}}
                size='large'
              >
                Fetching...
              </LoadingButton>
            :
            <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} onClick={async()=>{await getNFTOwners(NFTContract, network)}} >Retrieve</Button>
            }
            
          </Box>
          {dataRetrieved?
            <Box sx={{backgroundColor: 'white', paddingTop:2, display:'baseline'}}>
              <TextField required id='distribute-amount' label='Distribute Amount (MATIC)' variant='outlined' sx={{width:400, marginRight:4, marginTop:1}} onChange={ (e) => {handleChangeAmount(e)}}/>
              <Button size='large' variant='contained'sx={{padding:1.8, marginTop:1, width:120}} onClick={async()=>{scAddDistributedPayment(NFTContract, uniqueNFTOwners,holderShareCount,sharePool,distributionAmount)}} >Distribute</Button>
            </Box>: <h6></h6>
          }
        </Box>
      </Box>
    </Box>

</div>;
};

export default Distribute;