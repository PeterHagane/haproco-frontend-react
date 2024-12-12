import cx from "classnames"
// import themes from "./App.Themes.module.scss"
import css from "./DashboardPage.module.scss"

import { Login } from "../components/Login"
import { usePocket } from "../stores/PocketBaseProvider"


export const DashboardPage = ({
    children
}: {
    children?: React.ReactNode
}) => {

    const { isSignedIn } = usePocket()

    return <div className={cx(css.dashboardPage, "flex column fullHeight fullWidth")}>
        <h1>Dashboard</h1>
        {isSignedIn && <Login></Login>}
        {children}
    </div>
}

export default DashboardPage