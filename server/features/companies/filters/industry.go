package filters

func GetFilteredIndustries() map[string]bool {
	return filteredIndustries
}

var filteredIndustries = map[string]bool{
	"Staffing & Outsourcing":          true,
	"Staffing & Subcontracting":       true,
	"HR Consulting":                   true,
	"Insurance Agencies & Brokerages": true,
	"Investment & Asset Management":   true,
}
