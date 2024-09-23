package main

//std library
import (
	"bytes"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// This type represents a single block
type Block struct {
	Hash     []byte //represents the hash numblock
	Data     []byte //represents the data of this block
	PrevHash []byte //represents the previous (last) hash num block
}

// This type represents the whole blockchain. It contains an array of blocks.
type BlockChain struct {
	blocks []*Block
}

// This method creates the hash of the new block based on the previous hash block and the data of the current block
func (b *Block) DeriveHash() {
	//the variable info "concatenates" the slices of bytes from Data and PrevHash
	info := bytes.Join([][]byte{b.Data, b.PrevHash}, []byte{})
	//now we create the actual hash variable using sha256
	hash := sha256.Sum256(info)
	//finally we push that variable into the b Block's Hash field
	b.Hash = hash[:]
}

// This function creates the new block hask taking the data as string and the previous hash block
func CreateBlock(data string, prevHash []byte) *Block {
	//To create it, it uses the Block constructor. We'll take a reference to a block,
	//and in the Hash field will put there an empty slice of bytes.
	block := &Block{[]byte{}, []byte(data), prevHash}
	block.DeriveHash()
	return block
}

// This method allows us to add a block to the chain. It gets a pointer for our blockchain
// and by passing a data string we can create a new block and push it (Append) into the blockchain
func (chain *BlockChain) AddBlock(data string) {
	prevBlock := chain.blocks[len(chain.blocks)-1]
	newBlock := CreateBlock(data, prevBlock.Hash)
	chain.blocks = append(chain.blocks, newBlock)
}

// This method allows us to create the first block of the blockchain with no reference to any previous block
func Genesis() *Block {
	//We are just creating this first block with the "Genesis" string data and an empty slice previousHash
	return CreateBlock("Genesis", []byte{})
}

// This function inits the blockchain. It returns a reference ofour new brand blockchain.
// Inside of it, we are creating an array of blocks with a call to our genesis function
func InitBlockChain() *BlockChain {
	return &BlockChain{[]*Block{Genesis()}}
}

// Server
var goChain *BlockChain

// Handler to get the blockchain
func getBlockchain(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(goChain.blocks)
}

// Handler to add new block
func addBlock(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var input struct {
		Data string `json:"data"`
	}
	_ = json.NewDecoder(r.Body).Decode(&input)
	goChain.AddBlock(input.Data)
	json.NewEncoder(w).Encode(goChain.blocks)
}

// Middleware to enable CORS (Cross-Origin Resource Sharing) because React-App is at port 3000 and Go Server is at 8080
func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	goChain = InitBlockChain()
	fmt.Print("Init BlockChain \n")

	//Server setup
	r := mux.NewRouter()
	fmt.Print("Server setup \n")

	r.HandleFunc("/blocks", getBlockchain).Methods("GET")
	fmt.Print("handler function get method \n")
	r.HandleFunc("/blocks", addBlock).Methods("POST")
	fmt.Print("handler function post method \n")

	http.ListenAndServe(":8080", enableCors(r))
	fmt.Print("Server running on port 8080...\n")
}
