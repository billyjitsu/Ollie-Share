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
    //console.log(options);
    return options;
  }

  //indicates the frequency of rev received
  export function shareDistributionLengthOption(singleNFTContract, address){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "getsharesDistributionLength",
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
        "name": "getsharesDistributionLength",
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
    //console.log(options);
    return options;
  }

  export function payeeShareAtDistributionOption(singleNFTContract, address, id){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "getPayeeShareAtDistribution",
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
          },
          {
            "internalType": "uint256",
            "name": "distributionId",
            "type": "uint256"
          }
        ],
        "name": "getPayeeShareAtDistribution",
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
      params:{contractAddress: singleNFTContract, account: address, distributionId: id}
    }
    //console.log(options);
    return options;
  }

  export function releaseOption(singleNFTContract, address){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "release",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      params:{contractAddress: singleNFTContract, account: address}
    }
    //console.log(options);
    return options;
  }

  export function totalDistributedShares(singleNFTContract, id){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "getTotalDistributedShares",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "distributionId",
            "type": "uint256"
          }
        ],
        "name": "getTotalDistributedShares",
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
      params:{contractAddress: singleNFTContract, distributionId: id}
    }
    //console.log(options);
    return options;
  }

  export function distributedSum(singleNFTContract, id){
    let options = {
      contractAddress: "0xb9A178E782b6fc998Aa556686428a96379087777",
      functionName: "getDistributedSum",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "distributionId",
            "type": "uint256"
          }
        ],
        "name": "getDistributedSum",
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
      params:{contractAddress: singleNFTContract, distributionId: id}
    }
    //console.log(options);
    return options;
  }