import React, { useState } from 'react';
import './App.css';

const WalletApp = () => {
  const [publicAddress, setPublicAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [balance, setBalance] = useState('');

  // Generate wallet (publicAddress, publicKey and privateKey)
  const createWallet = async () => {
    try {
      const response = await fetch('http://localhost:8080/generate-wallet'); 
      const data = await response.json();
      setPublicAddress(data.publicAddress);
      setPublicKey(data.publicKey);
      setPrivateKey(data.privateKey);
    } catch (error) {
      console.error("Error creating the wallet:", error);
    }
  };

  // Get Wallet Balance
  const fetchBalance = async () => {
    try {
      const response = await fetch(`http://localhost:8080/get-balance?address=${publicAddress}`);
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  return (
    <div>
      <h1>GoLang Wallet Generator</h1>
      <button onClick={createWallet}>Generate Wallet</button>
      {publicAddress && (
        <div>
          <p><strong>Public Address:</strong> {publicAddress}</p>
          <p><strong>Public Key:</strong> {publicKey}</p>
          <button onClick={() => setShowPrivateKey(!showPrivateKey)}>
            {showPrivateKey ? 'Hide Private Key' : 'Show Private Key'}
          </button>
          {showPrivateKey && <p><strong>Private Key:</strong> {privateKey}</p>}
          <button onClick={fetchBalance}>Get Balance</button>
          {balance && <p><strong>Balance:</strong> {balance} ETH</p>}
        </div>
      )}
    </div>
  );
};

export default WalletApp;
