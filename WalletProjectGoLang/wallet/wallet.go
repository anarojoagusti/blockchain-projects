package wallet

import (
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

type WalletData struct {
	PrivateKey    string
	PublicKey     string
	PublicAddress string
}

func GenerateWalletKey() WalletData {
	//This function returns a private key and err
	prvk, err := crypto.GenerateKey()
	if err != nil {
		log.Fatal("Error generating private key, ", err)
	}
	//convert the private key into string
	privateData := crypto.FromECDSA(prvk)
	//now we encode it (hex)
	privateKey := hexutil.Encode(privateData)
	fmt.Println("Private key", privateKey)

	//now we generate the public key from the private key
	publicData := crypto.FromECDSAPub(&prvk.PublicKey)
	//now we enode it (hex)
	publicKey := hexutil.Encode(publicData)
	fmt.Println("Public Key: ", publicKey)

	//to generate the public wallet address from the public key
	publicWalletAddr := crypto.PubkeyToAddress(prvk.PublicKey).Hex()
	fmt.Println("Wallet Public Address: ", publicWalletAddr)

	return WalletData{
		PrivateKey:    privateKey,
		PublicKey:     publicKey,
		PublicAddress: publicWalletAddr,
	}

}
