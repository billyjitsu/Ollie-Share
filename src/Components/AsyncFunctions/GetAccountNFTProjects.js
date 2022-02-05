import React from 'react';
import { useMoralis } from "react-moralis";

const GetAccountNFTProjects = async () => {
    const {Moralis} = useMoralis();
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
      params:{account: "0x9dd061c8f5b88d712da59a5eb5b3214731c44394"}
    }
    let message = await Moralis.executeFunction(options);
    console.log("From SMART CONTRACT:" + message);
    return message;
  };
  


export default GetAccountNFTProjects;
