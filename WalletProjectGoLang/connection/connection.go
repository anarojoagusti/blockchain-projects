package connection

import (
	"context"
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/ethclient"
)

var infuraURL = "https://mainnet.infura.io/v3/YOUR_INFURA_ID"

func InitClient() (client *ethclient.Client) {
	//create the client and connect it to the mainnet via infura
	client, err := ethclient.DialContext(context.Background(), infuraURL)
	if err != nil {
		log.Fatal("Error to create the ether client: %v", err)
	}
	defer client.Close() //if client creation fails, close it to avoid memory leak
	//if not, get the blockNumber of the last block
	getLastBlock(client)
	return client
}

func getLastBlock(client *ethclient.Client) {
	//returns the last block number
	block, err := client.BlockByNumber(context.Background(), nil)
	if err != nil {
		log.Fatal("Error to get a block:%v", err)
	}
	fmt.Println("Block number: ", block.Number())

}
