import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import RevenuesReceived from "./routes/revenuesReceived";
import Distribute from "./routes/distribute";
import Stats from "./routes/stats";
import Explore from "./routes/explore";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider appId="lfQoEom8LYx3n5vXZB3yanagvNNEij55RpwHUTtE" serverUrl="https://nqel3zbuyyn9.usemoralis.com:2053/server">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="explore" element={<Explore />} />
        <Route path="stats" element={<Stats />} />
        <Route path="revenuesReceived" element={<RevenuesReceived />} />
        <Route path="distribute" element={<Distribute />} />
    </Routes>
  </BrowserRouter>
  </MoralisProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
