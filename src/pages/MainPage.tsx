import cx from "classnames"
import css from "./MainPage.module.scss"
import { width } from "../App"
// import Chat from "../components/Chat"
import { Tickets } from "../components/Ticket"
// import { useQuery } from "@tanstack/react-query"
// import { getAllWeatherForecasts } from "../queries/WeatherForecast"
// import { testTableQuery } from "../queries/TestTable"

export const MainPage = ({
    children
}: {
    children?: React.ReactNode
}) => {
    return <div className={cx(
        css.mainPage, "fullHeight flex column",
        width < 600 && css.mobile,
        width > 600 && css.desktop)}>
        <h1>Green Norway</h1>
        <div className="grid" style={{flexGrow: 1}}>
            <Tickets></Tickets>
            {/* <div>Tickets</div> */}
            <div>Content</div>
        </div>
        {children}
    </div>
}

export default MainPage


