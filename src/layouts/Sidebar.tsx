import cx from "classnames"
import css from "./Sidebar.module.scss"
import { ChatCenteredText } from "@phosphor-icons/react"
import { changeStyle } from "../util/Utils"
import { useState } from "react"

export const Sidebar = ({ children, icon = <ChatCenteredText size={25} /> }: { children?: React.ReactNode, icon?: any }) => {
    const [isOpen, setIsOpen] = useState(false)

    return <>
    <div className={cx(css.buttonContainer)}>
        <button className={cx("buttonise padding height-50", css.toggleButton, isOpen && "")}
            onClick={(e) => {
                changeStyle(e.currentTarget as HTMLElement, !isOpen ? "bounceSVGright" : "bounceSVGleft", 200)
                setIsOpen(!isOpen)
            }}
        >
            {icon}
        </button>
    </div>
    <div className={cx(css.sidebarContainer, isOpen ? css.open : css.closed)}>
        <div className={cx(css.sidebar, isOpen ? css.open : css.closed)} >
        {children}
        </div>
    </div>
    </>
}

export default Sidebar
