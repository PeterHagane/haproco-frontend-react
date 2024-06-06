export const connectionTypes = {
    // apiURI: "https://controll.azurewebsites.net/",
    localHostURI: "https://localhost:32770/"
    // 44398
}

export const getQueryStrings = (URI: string) => {

    const queryStrings = {
        weatherForecast: URI + "weatherforecast",
    }
    
    return queryStrings

}
