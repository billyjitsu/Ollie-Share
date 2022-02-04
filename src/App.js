import './App.css';
import CollapsibleTable from './Components/Table';
import {Typography } from '@mui/material';
import ResponsiveAppBar from './Components/MenuBar';
import { Link, Outlet } from 'react-router-dom';
import { useMoralis } from "react-moralis";
//import Moralis from 'moralis/types';



//const Moralis = require('moralis');

function App() {
  const {Moralis} = useMoralis();

  

  const getNFTOwners = async () => {
    const message = await Moralis.Web3API.token.getNFTOwners({chain: "mumbai",format: "decimal", address: "0x6FA8291a2DEf477CA5Af262F00a2d33e3770052e"});
    console.log(message);
  }

  getNFTOwners()
  const { authenticate, isAuthenticated, user } = useMoralis();
  //const options = { address: "0x6FA8291a2DEf477CA5Af262F00a2d33e3770052e", chain: "eth" };
 
  // const fetchOwners = async () => {
  //   Moralis.start()
  //   const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
  //   console.log(nftOwners);
  // };

  // fetchOwners()

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Typography align='center' variant='h4' sx={{p:4, 'font-weight': 'bold'}}> Easily Distribute Revenues</Typography>
      <Typography align='center' variant='h6' sx={{color: 'Grey', p:0}}>
        These are your distributed revenues received from NFT projects as a token holder.
      </Typography>
      
      <div style={{margin: "70px"}}>
       <CollapsibleTable/>
       </div>
      <Link to="/landing">Landing</Link>
      <Link to="/revenuesReceived">Revenues Received</Link>
      <Link to="/distribute">Distribute Revenue</Link>
    </div>
  );
}

export default App;
