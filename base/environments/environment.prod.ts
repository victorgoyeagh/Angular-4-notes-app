export const environment = {
    production: true,
    envName: 'prod',
    configurations: {
        names: {
            cookieUserStr: "E_APP_USER"
        },
        settings: {
            siteName: "Notes App"
        },
        api: {
            domain: "http://localhost:3000/",
            urls:{
                credentialsTable: "http://localhost:3000/credentials",
                usersTable: "http://localhost:3000/users",
                commentsTable: "http://localhost:3000/comments",
                notesTable: "http://localhost:3000/notes"
            }
        },
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
