import Header from "./Header"
import { Footer } from "./Footer"
import css from "./PageLayout.module.scss"
import cx from "classnames"
import Sidebar from "./Sidebar"
import Chat from "../components/Chat"
import { usePocket } from "../stores/PocketBaseProvider"

export const PageLayout = ({
    children
}: {
    children?: React.ReactNode
}) => {
    const {isSignedIn} = usePocket()

    return <div className={cx("flex row")}>
        
        <div className={cx(css.pageLayout, "flex column")}>
            <Header></Header>
            {children}
            <Footer></Footer>
            
        </div>
        {isSignedIn && <Sidebar><Chat></Chat></Sidebar>}
    </div>
}

export default PageLayout