import logo from './logo.svg';
import './App.css';
import CollapsibleTable from './Components/Table';
import { AppBar, Button, Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import ResponsiveAppBar from './Components/MenuBar';

const Moralis = require('moralis');

function App() {
  const options = { address: "0x6FA8291a2DEf477CA5Af262F00a2d33e3770052e", chain: "eth" };
 
  // const fetchOwners = async () => {
  //   Moralis.start()
  //   const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
  //   console.log(nftOwners);
  // };

  // fetchOwners()
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <div className='container'>
        <CollapsibleTable/>
      </div>
    </div>
  );
}

export default App;
