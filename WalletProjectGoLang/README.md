# GoLang Wallet Generator

This project is a web application that generates an Ethereum wallet using GoLang for the backend and React for the frontend. The application allows you to create a new wallet, display the public address, public key, and has an option to show/hide the private key. Additionally, it retrieves the balance of the generated wallet.

## Features

- Generate Ethereum wallets (public address, public key, private key).
- Option to show/hide the private key.
- Fetch the wallet's balance in Ether.
- Backend developed with GoLang.
- Frontend built with React.
- Simple and modern design with a black background, blue buttons, and white text.
- Displays GoLang and React icons on the interface.

## Technologies Used

- **GoLang**: Backend to generate wallets and retrieve balance information.
- **React**: Frontend for user interaction.
- **Ethereum GoLang Client**: To connect to the Ethereum blockchain and manage wallet data.
- **Infura**: To connect to the Ethereum mainnet.

## Prerequisites

Before getting started, make sure you have the following tools installed:

- **GoLang** (v1.16 or higher)
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Infura**: You will need an Infura account to connect to the Ethereum blockchain. [Create an account here](https://infura.io/).

## Project Setup

### Backend (GoLang)

1. Clone the repository and navigate to the project directory:

   ```
   git clone https://github.com/yourusername/blockchain-projects.git
   cd WalletProjectGoLang
   ```

2. Set up your GoLang environment and install dependencies:
    ``` 
    go mod tidy
    ```

3. Replace the Infura URL in the connection.go file with your Infura project endpoint:

    ```  
    var infuraURL = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
    ```

4. Run the Go server:
    ```
    go run main.go
    ```

The server will start at http://localhost:8080.

### Frontend (React)
1. Navigate to the client directory:
    ```
    cd frontend
    ```
2. Install the React dependencies:
    ```
    npm install
    ```
3. Start the React development server:

    ```
    npm start
    ```
The application will be available at http://localhost:3000.

## Usage
1. Open the application in your browser at http://localhost:3000.
2. Click "Generate Wallet" to create a new Ethereum wallet.
3. The public address and public key will be displayed.
4. Click "Show Private Key" to reveal the private key (you can toggle it).
5. Click "Get Balance" to fetch the wallet's balance from the Ethereum blockchain.
