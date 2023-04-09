/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Web3 from 'web3';
import MintButton from './MintButton';
import './Mintzy.css';
import pdfpic from './pdfpic.jpeg'

// Connect to Metamask
const connectMetamask = async () => {
  const ethereum = (window as any).ethereum;
  await ethereum.request({ method: 'eth_requestAccounts' });

  const web3 = new Web3(ethereum);
  return web3;
};

const Mintzy: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  const handleConnect = async () => {
    const connectedWeb3 = await connectMetamask();
    setWeb3(connectedWeb3);
  };

  return (
    <div className='mintzy' >
      <img className='pic' src={pdfpic} alt="" />
      {web3 ? (
        <MintButton web3={web3} mintAmount={1} />
      ) : (
        <button className='mintbtn' onClick={handleConnect}>0.04 AVAX</button>
      )}
    </div>
  );
};

export default Mintzy;
