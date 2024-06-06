import cx from "classnames"
import css from "./MainPage.module.scss"
import { width } from "../App"
import { useQuery } from "@tanstack/react-query"
import { getAllWeatherForecasts } from "../queries/WeatherForecast"

export const sections = {
    home: { id: crypto.randomUUID() },
    dashboard: { id: crypto.randomUUID() },
}


export const MainPage = ({
    children
}: {
    children?: React.ReactNode
}) => {

    // const queryClient = useQueryClient()

    const { data, error } = useQuery({ queryKey: ['allWeatherForecasts'], queryFn: getAllWeatherForecasts })



    return <div className={cx(
        css.mainPage,
        width < 600 && css.mobile,
        width > 600 && css.desktop)}>

        {children}
        asdads

        {data && data?.map((f)=>{
            return <>{f.summary}</>
        })}

        {error && <>{error.message}</>}

        
    </div>
}




export default MainPage


