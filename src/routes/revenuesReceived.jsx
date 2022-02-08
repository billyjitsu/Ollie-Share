import React from 'react';
import { Typography } from '@mui/material';
import CollapsibleTable from '../Components/Table';
import ResponsiveAppBar from '../Components/MenuBar';
import { useMoralis } from "react-moralis";
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DataTable from '../Components/DataTable';
import { getNFTOptions, getReleasedOptions, getAmountOptions, releaseOption, shareDistributionLengthOption,payeeShareAtDistributionOption, totalDistributedShares, distributedSum } from '../Components/ScData';
import DistributionTable from '../Components/DistributionTable';
import DistributionTableItem from '../Components/DistributionTableItem';


const RevenuesReceived = (props) => {
  const {Moralis} = useMoralis();
  const { authenticate, isAuthenticated, user } = useMoralis();

  //authenticate();

  const [address, setAddress] = useState();
  const [revenue, setRevenue] = useState([]); //TODO: doesn't work with const, changed to var
  const [data, setData] = useState([1,2,3]);
  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.attributes.ethAddress);
      console.log("user address: " + user.attributes.ethAddress);
      getAccountData(user.attributes.ethAddress);
    }

      async function getAccountData(userAddress) {

        //load NFT projects that the user owns
        console.log("inside async");
        let NFTProjects = await Moralis.executeFunction(getNFTOptions(userAddress));
        console.log(NFTProjects);

        let distributed = [NFTProjects.length];
        let released = [NFTProjects.length];
        let contractName = [NFTProjects.length];


        let accountReceivedData = [NFTProjects.length];
        //load payeeTotalDistributedAmount and released for each NFT Project
        for (let i=0; i < NFTProjects.length; i++){
            distributed[i] = await Moralis.executeFunction(getAmountOptions(NFTProjects[i], userAddress));
            released[i] = await Moralis.executeFunction(getReleasedOptions(NFTProjects[i], userAddress));
            //TODO: works on mumbai only
            let message = await Moralis.Web3API.token.getNFTOwners({chain: "mumbai",format: "decimal", address: NFTProjects[i]});

            let item = {
              name: message.result[0]["name"],
              contract: NFTProjects[i],
              shares: 0,
              balance: released[i],
              revenue: distributed[i],
              history: [
                // {
                //   date: '2020-01-05',
                //   distId: '11091700',
                //   shares: 3,
                // },
                // {
                //   date: '2020-01-02',
                //   distId: 'Anonymous',
                //   shares: 1,
                // },
              ],
            }
            
            let distLength = await Moralis.executeFunction(shareDistributionLengthOption(NFTProjects[i], userAddress));
            for (let j=0; j < distLength; j++){
              let share =  await Moralis.executeFunction(payeeShareAtDistributionOption(NFTProjects[i], userAddress,j));
              let totalShareAtThisDist = await Moralis.executeFunction(totalDistributedShares(NFTProjects[i],j));
              let totalDistributedSum = await Moralis.executeFunction(distributedSum(NFTProjects[i], j));
              //let payout = share * totalDistributedSum / totalShareAtThisDist; //due to bignumber
              let history = {
                id: j,
                share: parseFloat(Moralis.Units.FromWei( share._hex,0)),
                pool: parseFloat(Moralis.Units.FromWei( totalShareAtThisDist._hex,0)),
                payout: parseFloat(Moralis.Units.FromWei( share._hex,0)) * parseFloat(Moralis.Units.FromWei( totalDistributedSum._hex,18)) / parseFloat(Moralis.Units.FromWei( totalShareAtThisDist._hex,0))
              }
              item.shares = parseInt(Moralis.Units.FromWei( share._hex,0)) //get the latest share count
              item.history.push(history)
            }
            accountReceivedData[i] = item;
        }
 
        //console.log("Project: " + NFTProjects);
        //console.log("Distributed: "+ distributed);
        //console.log("Released"+ released);

        console.log(accountReceivedData);
        //console.log(JSON.stringify(accountReceivedData));

        setRevenue(accountReceivedData);
        //revenue = accountReceivedData; //TODO: how to pass this data to Table and render as a Table??
        //console.log("From revenue:");
       // console.log(revenue);
        setRevenue((state) => {
          //console.log(state); // "React is awesome!"
          setData(state);
          console.log("from data:")
          console.log(data);
          return state;
        });
      }
    
    
  }, [isAuthenticated]);

  async function withdrawHandler(NFTContract, funds){
    console.log("Withdraw: " +funds +" MATIC");
    try{
      let result = await Moralis.executeFunction(releaseOption(NFTContract, address));
      console.log("Withdrawal Result: ");
      console.log(result);
    } catch (err) {
      console.log("Withdrawal Error:");
      console.log(err.message);
      alert(err.message);
    }
    
  }

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
      
      <div style={{margin: "70px"}}>
        {isAuthenticated? <DistributionTable data={data} onWithdraw={withdrawHandler}/>: <h2> </h2>}
        
       </div>
  </div>;
};

export default RevenuesReceived;
