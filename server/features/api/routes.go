package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func ConfigureRoutes() {
	r := mux.NewRouter()

	api := r.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/jobs/scrape", scrapeJobs).Methods(http.MethodPost)
	api.HandleFunc("/companies/{companyId}/setIgnoreFlag", ignoreCompany).Methods(http.MethodPost)
	api.HandleFunc("/companies/{companyId}/requestUpdate", updateCompany).Methods(http.MethodPost)

	fmt.Println("Server started")
	log.Fatal(http.ListenAndServe(":9000", r))
}
