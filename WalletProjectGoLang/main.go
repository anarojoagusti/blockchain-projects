package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/anarojoagusti/blockchain-projects/connection"
	"github.com/anarojoagusti/blockchain-projects/interaction"
	"github.com/anarojoagusti/blockchain-projects/wallet"
)

// Middleware to enable CORS
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*") // Permitir todos los orígenes
}

// Struct para devolver los datos de la wallet al frontend
type WalletResponse struct {
	PublicAddress string `json:"publicAddress"`
	PublicKey     string `json:"publicKey"`
	PrivateKey    string `json:"privateKey"`
}

func generateWalletHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	walletData := wallet.GenerateWalletKey()

	response := WalletResponse{
		PublicAddress: walletData.PublicAddress,
		PublicKey:     walletData.PublicKey,
		PrivateKey:    walletData.PrivateKey,
	}

	json.NewEncoder(w).Encode(response)
}

func balanceHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	address := r.URL.Query().Get("address")
	client := connection.InitClient()
	balance := interaction.BalanceOf(address, client)

	json.NewEncoder(w).Encode(map[string]string{"balance": balance})
}

func main() {
	http.HandleFunc("/generate-wallet", generateWalletHandler)
	http.HandleFunc("/get-balance", balanceHandler)
	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
