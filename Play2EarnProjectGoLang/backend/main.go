package main

import (
	"fmt"
	"net/http"
)

// Función principal para manejar la lógica del backend
func main() {
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/reward", rewardHandler)

	fmt.Println("Server running at: http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

// Login to authenticate users (offchain for now)
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		player := r.FormValue("player")
		fmt.Fprintf(w, "Wellcome, %s!", player)
	} else {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}

// For now, simulate tokens reward
func rewardHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		player := r.FormValue("player")
		// ToDo: Interact with smart contract for rewards

		fmt.Fprintf(w, "Reward sent to %s", player)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
