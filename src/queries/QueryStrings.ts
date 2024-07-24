export const connectionTypes = {
    // apiURI: "https://controll.azurewebsites.net/",
    localHostURI: "https://localhost:32770/",
    API_URI: process.env.API_URI
}

export const getQueryStrings = ({URI = process.env.API_URI}:{URI?: string}) => {
    const queryStrings = {
        weatherForecast: URI + "/weatherforecast",
        testTable: URI + "/testtable",
    }
    
    return queryStrings

}
