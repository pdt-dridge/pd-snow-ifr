// value is the field in the webhook
var inboundDetails = value;

// result is what will go into the description field
var result = "";

if(inboundDetails.type == "api"){
	// events api details are in the cef_details object
	
	// so you can take the full object
	//result = JSON.stringify(inboundDetails.cef_details, "", "\t");
	
	// or just the custom_details
	//result = JSON.stringify(inboundDetails.cef_details.details, "", "\t");
		
	// or just pick and choose the fields:
	var cef = inboundDetails.cef_details;
	
	var description =
		"Description: " + cef.description  + "\n" +
		"Details: "     + JSON.stringify(cef.details, "", "\t") + "\n" +
		"Group: "	    + cef.service_group     + "\n" +
		"Severity: "    + cef.severity          + "\n" +
		"Component: "   + cef.source_component  + "\n" +
		"Source : "	    + cef.source_origin     + "\n" +
		"Class: "         + cef.event_class       + "\n\n" +
		cef.client  + ": " + cef.client_url     + "\n" ; 
	
	result = description;
	
} else if (inboundDetails.type == "email"){	
	
	// email body used for the description of the ticket
	// assumes plain text (SNOW renders the \n correctly)
	result = inboundDetails.body;
	
} else {
	// used for types web_trigger (manual), slack, ms teams, etc.
	result = inboundDetails.details;
}