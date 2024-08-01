import cx from "classnames"
import css from "./MainPage.module.scss"
import { width } from "../App"
// import { useQuery } from "@tanstack/react-query"
// import { getAllWeatherForecasts } from "../queries/WeatherForecast"
// import { testTableQuery } from "../queries/TestTable"

export const MainPage = ({
    children
}: {
    children?: React.ReactNode
}) => {

    return <div className={cx(
        css.mainPage,
        width < 600 && css.mobile,
        width > 600 && css.desktop)}>

        {children}
        MainPage
        
    </div>
}




export default MainPage


