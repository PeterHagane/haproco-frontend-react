import { getQueryStrings } from "./QueryStrings"
import axios from "axios";

export const queryStrings = getQueryStrings({URI: process.env.API_URI})

console.log(queryStrings.weatherForecast)

export interface IWeatherForecast {
    date: string,
    temperatureC: number,
    temperatureF: number,
    summary: string
}


export async function getAllWeatherForecasts(): Promise<IWeatherForecast[]> {
    let data: IWeatherForecast[]

    try {
        const response = await axios.get(queryStrings.weatherForecast)
        data = response.data as IWeatherForecast[]
        return data
    }

    catch (error) {
        console.log(error);
    }

    return [] as IWeatherForecast[]
}