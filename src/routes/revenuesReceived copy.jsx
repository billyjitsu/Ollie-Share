import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DataTable from '../Components/DataTable';


const RevenuesReceived = (props) => {
  const {Moralis} = useMoralis();
  const { authenticate, isAuthenticated, user } = useMoralis();

  //authenticate();

  const [address, setAddress] = useState();
  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.attributes.ethAddress);
      console.log("user address: " + user.attributes.ethAddress);
    }
  }, [isAuthenticated]);

  var [revenue, setRevenue] = useState([]); //TODO: doesn't work with const, changed to var

  function getAmountOptions (singleNFTContract){
    let amountOptions = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "payeeTotalDistributedAmount",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "payeeTotalDistributedAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      params:{contractAddress: singleNFTContract, account: address}
    }
    return amountOptions;
  }

  function getReleasedOptions (singleNFTContract){
    let releasedOptions = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "released",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "released",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      params:{contractAddress: singleNFTContract, account: address}
    }
    return releasedOptions;
  }

  function getNFTOptions(){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "getAccountNFTProjects",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "getAccountNFTProjects",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      params:{account: address}
    }
    return options;
  }

  const getAccountReceivedData = async () => {
    
    let NFTProjects = await Moralis.executeFunction(getNFTOptions());
    console.log(NFTProjects);

    let distributed = [NFTProjects.length];
    let released = [NFTProjects.length];


    let accountReceivedData = [NFTProjects.length];
    //load payeeTotalDistributedAmount and released
    for (let i=0; i < NFTProjects.length; i++){
        distributed[i] = await Moralis.executeFunction(getAmountOptions(NFTProjects[i]));
        released[i] = await Moralis.executeFunction(getReleasedOptions(NFTProjects[i]));

        let item = {
          contractName: "test",
          contract: NFTProjects[i],
          shares: 0,
          balance: released[i],
          revenue: distributed[i],
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
        }
        accountReceivedData[i] = item;
    }
    //let distributedAmount = await Moralis.executeFunction(options);
    console.log("Project: " + NFTProjects);
    console.log("Distributed: "+ distributed);
    console.log("Released"+ released);


    //console.log(JSON.stringify(accountReceivedData));

    setRevenue(accountReceivedData);
    revenue = accountReceivedData; //TODO: how to pass this data to Table and render as a Table??

    console.log(revenue);


  }
//getAccountNFTProjects();
  return <div>
    <ResponsiveAppBar/>
      <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}>Revenues Received</Typography>
      {isAuthenticated?
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
          These are your distributed revenues received from NFT projects as a token holder.
        </Typography>: 
        <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
        Please login to see revenues that you have received.
      </Typography>}
      
      <Button onClick={getAccountReceivedData} >Load Data</Button>  
        {!revenue==null? <Typography>{"test"+revenue[0].contract}</Typography>: <h6>nothing</h6>}
      
        {data.map((n)=>(<Typography>n.contractName </Typography>))}


      <div style={{margin: "70px"}}>
        {isAuthenticated? <CollapsibleTable data={revenue}/>: <h2> </h2>}
       
       </div>
  </div>;
};

export default RevenuesReceived;
