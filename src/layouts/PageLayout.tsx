import Header from "./Header"
import { Footer } from "./Footer"
import css from "./PageLayout.module.scss"
import cx from "classnames"

export const PageLayout = ({
    children
}:{
    children?: React.ReactNode }) => {

    return <div className={cx(css.pageLayout, "flex column justifyContentCenter alignItemsCenter")}>
            <Header></Header>
            {children}
            <Footer></Footer>
    </div>
}

export default PageLayout