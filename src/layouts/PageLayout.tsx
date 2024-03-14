import cx from "classnames"
// import themes from "./App.Themes.module.scss"
// import fonts from  "./App.Fonts.module.scss"
import "./PageLayout.module.scss"
import Header from "./Header"


export const DefaultLayout = ({
    children
}:{
    children?: React.ReactNode }) => {
    return <div className={cx(
        // themes.themeLight
    )}>
        <Header></Header>
        {children}
    </div>
}

export default DefaultLayout