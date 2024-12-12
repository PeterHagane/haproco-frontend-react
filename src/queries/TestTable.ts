import { useQuery } from "@tanstack/react-query";
import { getQueryStrings } from "./QueryStrings"
import axios from "axios";
import { pb } from "../stores/PocketBaseProvider";

export const queryStrings = getQueryStrings({URI: process.env.API_URI})

export interface ITestTable {
    id: number 
    first_name?: string  
    last_name?: string 
    department?: string 
    salary?: number
}


export async function getAllTestTable(): Promise<ITestTable[]> {
    let data: ITestTable[]

    try {
        const response = await axios.get(queryStrings.testTable, {params: {
          token: pb.authStore.token,
          id: pb.authStore.model?.id
        }})
        data = response.data as ITestTable[]
        return data
    }

    

    catch (error) {
        console.log(error);
    }

    return [] as ITestTable[]
}

export const testTableQuery = () => {
    const {
      data: testTableData,
      error: testTableError,
      isError: testTableIsError,
      isLoading: testTableIsLoading,
      refetch: testTableRefetch } = useQuery<ITestTable[], Error>(
        { queryKey: ['allTestTable'], queryFn: getAllTestTable }
      )
  
    return { testTableData, testTableError, testTableIsError, testTableIsLoading, testTableRefetch }
  }
