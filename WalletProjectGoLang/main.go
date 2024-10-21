package main

import (
	"fmt"

	"github.com/anarojoagusti/blockchain-projects/connection"
	"github.com/anarojoagusti/blockchain-projects/interaction"
)

func main() {
	fmt.Println("Init ether client")
	client := connection.InitClient()
	fmt.Println("Check my wallet balance")
	interaction.BalanceOf("0x9D81E1Bd64112ebDbB1FA533f9c0f4BBfB0B26A7", client)
}
