# Play2Earn Game

## Overview
This is a Play2Earn game built using Phaser.js, React, and blockchain technologies. Players can enjoy a 2D platformer game while earning rewards in the form of tokens based on their in-game performance. The project integrates Web3 for wallet connectivity, allowing users to claim rewards directly to their connected wallets.

## Features
- **2D Platform Game**: Developed with Phaser.js, featuring engaging levels, obstacles, and collectibles.
- **Play2Earn Mechanic**: Players earn rewards based on their scores, creating a unique play-to-earn experience.
- **Smart Contract Integration**: A smart contract on the Polygon Amoy testnet manages reward distribution and ensures secure interactions.
- **Wallet Connectivity**: Integrated ConnectKit and wagmi for seamless wallet connectivity via MetaMask.

## Technologies Used
- **Frontend**: Phaser.js for the game, React for UI components.
- **Blockchain**: Solidity smart contract deployed on Polygon Amoy testnet.
- **Web3 Integration**: ConnectKit and wagmi for wallet connectivity and blockchain interaction.
- **Backend**: Alchemy API for blockchain communication.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MetaMask extension for wallet integration.
- Access to Alchemy API for interacting with the Polygon testnet.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/play2earn-game.git
   cd play2earn-game
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Alchemy API key:
   ```
   REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
   ```
4. Run the development server:
   ```bash
   npm start
   ```
5. Access the game locally at `http://localhost:3000`.

### Smart Contract Deployment
The smart contract is written in Solidity and deployed on the Polygon Amoy testnet. It handles token distribution based on player scores. You can use Remix or Hardhat to compile, deploy, and verify the contract.

### Wallet Integration
Players need to connect their wallets via MetaMask to earn and claim rewards. Once connected, players can track their score and claim tokens after completing game levels.

## Gameplay
- Players control a character navigating through platforms, avoiding enemies, and collecting stars.
- Rewards are distributed based on the number of stars collected.
- After collecting all stars, players can claim their reward via the "Claim Rewards" button, which interacts with the deployed smart contract.

## Reward System
- The reward rate is set to **0.001 POL** per collected star.
- Players can only claim rewards once per session to prevent multiple claims for the same score.

## Folder Structure
- **src/**: Contains game logic, scenes, and components.
  - **game.js**: Core gameplay logic, including player movement, score calculation, and level management.
  - **wagmiConfig.js**: Web3 configuration for wallet connectivity and blockchain interactions.
  - **abi/**: ABI of the deployed smart contract for blockchain interaction.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Phaser.js for game development.
- ConnectKit and wagmi for simplifying wallet integration.
- Polygon for providing the testnet infrastructure.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
