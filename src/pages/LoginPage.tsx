import cx from "classnames"
// import themes from "./App.Themes.module.scss"
import css from "./LoginPage.module.scss"
import { Login } from "../components/Login"
import { usePocket } from "../stores/PocketBaseProvider"


export const LoginPage = ({
    children,
    loginMessage
}: {
    children?: React.ReactNode
    loginMessage?: string
}) => {
    const { isSignedIn, user } = usePocket()

    return <div className={cx(css.loginPage, "flex column justifyContentCenter fullHeight")}>
        {!loginMessage && !isSignedIn && <h1 className="">Sign in</h1>}
        {!loginMessage && isSignedIn && <h1 className="">Hello, {user?.username || user?.email} </h1>}
        {loginMessage && <h3 className="padding-5">{loginMessage}</h3>}
        <Login></Login>
        {children}
    </div>

}

export default LoginPage