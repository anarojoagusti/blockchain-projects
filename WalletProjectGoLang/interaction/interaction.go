package interaction

import (
	"context"
	"fmt"
	"log"
	"math"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func BalanceOf(addr string, client *ethclient.Client) {
	address := common.HexToAddress(addr)

	balance, err := client.BalanceAt(context.Background(), address, nil)
	if err != nil {
		log.Fatal("Error to get the balance: ", err)
	}
	//parse it from big integer to big float
	fBalance := new(big.Float)
	fBalance.SetString(balance.String())
	fmt.Println("The balance is: ", fBalance)
	//convert wei to ether --> 1 eth = 10 ^ 18 wei
	balanceEther := new(big.Float).Quo(fBalance, big.NewFloat(math.Pow10(18)))
	fmt.Println("Ether balance: ", balanceEther)
}
