import Header from "./Header"
import { Footer } from "./Footer"
import css from "./PageLayout.module.scss"
import cx from "classnames"

export const PageLayout = ({
    children
}:{
    children?: React.ReactNode }) => {

    return <div className={cx("flex column center", css.pageLayout)}>
            <Header></Header>
            {children}
            <Footer></Footer>
    </div>
}

export default PageLayout