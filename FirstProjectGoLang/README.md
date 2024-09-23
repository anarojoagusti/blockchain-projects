# Basic Blockchain Web3 App - GoLang & React

This is a simple project built with **GoLang** for the backend and **React** for the frontend to reinforce fundamental concepts of blockchain and hashing. The app simulates a blockchain where each block contains a hash, the previous block's hash, and data, and these blocks are linked together.

## Objective
The goal of this project is to provide a basic visualization and interaction with a blockchain structure. It allows users to input data and create new blocks dynamically, showing how the chain grows.

## Prerequisites

### Go Backend
- Install Go: [Go Installation](https://golang.org/doc/install)
- Install the `gorilla/mux` package for routing:

  ```bash
  go get -u github.com/gorilla/mux
  ```

### React Frontend
Install Node.js and npm: [Node Installation](https://nodejs.org/en)


## Project Setup
**1. Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/blockchain-golang-react.git
    cd blockchain-golang-react
    ```

**2. Start the Go Backend** 
Navigate to the Go backend folder and run the server:

    ```bash
    go run main.go
    The server will start on http://localhost:8080.
    ```

**3. Start the React Frontend**
Navigate to the React frontend folder and install dependencies:

    ```bash
    cd blockchain-ui
    npm install
    ```

Start the React development server:

    ```bash
    npm start
    ```
The UI will be available at http://localhost:3000.

## Interaction with the UI
Open the app in your browser at http://localhost:3000.
You will see the Genesis block already created.
Enter data in the input field to create a new block and press "Create Block".
The new block will be added to the chain and displayed below with its Hash, Data, and Previous Hash.

## Technologies Used
**GoLang**: For the backend blockchain logic.
**React**: For the user interface to interact with the blockchain.
**Gorilla/Mux**: To handle HTTP routing in Go.
