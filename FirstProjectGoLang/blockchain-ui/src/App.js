import React, { useState, useEffect } from 'react';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    // Fetch the blockchain data from the Go API
    fetch("http://localhost:8080/blocks")
      .then(response => response.json())
      .then(data => setBlocks(data));
  }, []);

  const addBlock = () => {
    fetch("http://localhost:8080/blocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(response => response.json())
      .then(data => setBlocks(data));
    setData(""); // Clear input field
  };
  

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#f0f8ff', // Color de fondo
  };

  const inputStyles = {
    margin: '10px',
    padding: '10px',
    width: '300px',
  };

  const buttonStyles = {
    padding: '10px 20px',
    margin: '10px',
  };

  return (
    <div className="App" style={styles}>
      <h1>Blockchain</h1>
      <input
        type="text"
        value={data}
        onChange={e => setData(e.target.value)}
        placeholder="Enter data for the new block"
        style={inputStyles}
      />
      <button onClick={addBlock} style={buttonStyles}>Create Block</button>

      <h2>Blocks:</h2>
      {blocks.map((block, index) => (
        <div key={index}>
          <p><strong>Hash:</strong> {block.Hash}</p>
          <p><strong>Data:</strong> {block.Data}</p>
          <p><strong>PrevHash:</strong> {block.PrevHash}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
