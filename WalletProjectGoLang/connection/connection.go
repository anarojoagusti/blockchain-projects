package connection

/*var infuraURL = "https://mainnet.infura.io/v3/8f72021b7a5f405990c4b3a9f0a90bfa"*/

func HolaMundo() string {
	return "Hola"
}

/*func InitClient() {
	//create the client and connect it to the mainnet via infura
	client, err := ethclient.DialContext(context.Background(), infuraURL)
	if err != nil {
		log.Fatal("Error to create the ether client: %v", err)
	}
	defer client.Close() //if client creation fails, close it to avoid memory leak
	//if not, get the blockNumber of the last block
	getBlockNumber(client)
}

func getBlockNumber(client *ethclient.Client) {
	//returns the last block number
	blockNum, err := client.BlockByNumber(context.Background(), nil)
	if err != nil {
		log.Fatal("Error to get a block:%v", err)
	}
	fmt.Println("Block number: ", blockNum)
}*/
