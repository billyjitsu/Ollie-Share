import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useMoralis } from "react-moralis";


const DataTable = () => {

  const [tableData, setTableData] = useState([])

  const {Moralis} = useMoralis();
  const { authenticate, isAuthenticated, user } = useMoralis();

  //authenticate();

  const [address, setAddress] = useState();
  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.attributes.ethAddress);
      console.log("user address: " + address);
    }
  }, [isAuthenticated]);

  const [revenue, setRevenue] = useState([]);

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

  

  useEffect(() => {
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
            }
            accountReceivedData[i] = item;
        }
        //let distributedAmount = await Moralis.executeFunction(options);
        console.log("Project: " + NFTProjects);
        console.log("Distributed: "+ distributed);
        console.log("Released"+ released);
    
    
        //console.log(JSON.stringify(accountReceivedData));
    
        setRevenue(accountReceivedData);
        //revenue = accountReceivedData;
    
        console.log(revenue);
    
        return revenue;
      }
      getAccountReceivedData()
    //console.log("table data:" + tableData);
  }, [])

  console.log(tableData)

  return (
    <div style={{ height: 700, width: '100%' }}>

    </div>
  )
}

export default DataTable