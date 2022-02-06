export function getAmountOptions (singleNFTContract, address){
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

  export function getReleasedOptions (singleNFTContract, address){
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

  export function getNFTOptions(address){
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
    console.log(options);
    return options;
  }

 