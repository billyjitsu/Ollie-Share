import './App.css';
import CollapsibleTable from './Components/Table';
import {Typography } from '@mui/material';
import ResponsiveAppBar from './Components/MenuBar';
import { Link, Outlet } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import { Button } from '@mui/material';
import GetAccountNFTProjects from './Components/AsyncFunctions/GetAccountNFTProjects';
import HeroSection from './Components/HeroSection';
import InfoSection from './Components/InfoSection';
import Services from './Components/Services';
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree
} from './Components/Data';
import Footer from './Components/Footer';
//import Moralis from 'moralis/types';



//const Moralis = require('moralis');

function App() {
  const {Moralis} = useMoralis();

  
 // ["0x9dd061c8f5b88d712da59a5eb5b3214731c44394", "0x44fce80b50bf5414c24e56bcf5298d52dc6ed5de"]
  //getNFTOwners("0x6FA8291a2DEf477CA5Af262F00a2d33e3770052e");
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


 <InfoSection {...homeObjTwo} />
 <Services/>
 <Footer/>

     

      
    </div>
  );
}

export default App;
