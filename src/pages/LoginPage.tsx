import cx from "classnames"
// import themes from "./App.Themes.module.scss"
import css from "./LoginPage.module.scss"


export const LoginPage = ({
    children
}: {
    children?: React.ReactNode
}) => {

    // const authData = await pb.collection('users').authWithPassword(
    //     'YOUR_USERNAME_OR_EMAIL',
    //     'YOUR_PASSWORD',
    // );

    return <div
    className={cx(
        css.loginPage)}
    >
        {children}

        Login

        <h1>
            {/* {pb.authStore.isValid.toString()} */}
        </h1>
    </div>
}

export default LoginPage