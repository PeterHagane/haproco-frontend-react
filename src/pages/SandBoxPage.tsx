import cx from "classnames"
import css from "./MainPage.module.scss"
import { width } from "../App"
import { useQuery } from "@tanstack/react-query"
import { getAllWeatherForecasts } from "../queries/WeatherForecast"
import { testTableQuery } from "../queries/TestTable"
export const SandBoxPage = ({
    children
}: {
    children?: React.ReactNode
}) => {

    // const queryClient = useQueryClient()

    const { data, error } = useQuery({ queryKey: ['allWeatherForecasts'], queryFn: getAllWeatherForecasts })
    const { testTableData, testTableIsLoading, testTableError } = testTableQuery()

    // console.log(data)
    return <div className={cx(
        css.mainPage,
        width < 600 && css.mobile,
        width > 600 && css.desktop)}>

        {children}

        {data && data?.map((f, i)=>{
            return <div className="fadeIn" key={f.summary + i}>{f.summary}</div>
        })}

        {testTableIsLoading && <div className="loader"></div>
        }

        {testTableData && testTableData?.map((f, i)=>{
            return <div className="fadeIn" key={f.first_name || "" + i}>{f.first_name || "null!"}</div>
        })}

        {error && <>{error.message}</>}

        {testTableError && <>{testTableError.message}</>}

        
    </div>
}




export default SandBoxPage


