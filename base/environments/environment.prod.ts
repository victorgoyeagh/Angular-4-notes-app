export const environment = {
    production: true,
    envName: 'prod',
    configurations: {
        
        uiConfig: {
            bypassLoadingBay: false,
            modalDefaultDimensions: {
                Height: 400,
                Width: 400 
            },
            errorMessages: {
                dataError: "Something went wrong fetching the data",
                communicationError: "Could not communicate update"
            }
        }
    }
}; 
