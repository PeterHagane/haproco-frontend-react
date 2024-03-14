import cx from "classnames"
import css from "./Button.module.scss"

export interface IButton {
    className?: string
    style?: React.CSSProperties
    onClick?: (param: any) => void,
    icon?: JSX.Element
    tooltip?: string
    isDisabled?: boolean
    children?: React.ReactNode
}

export const Button = ({
    className, 
    onClick,
    style, 
    children,
    isDisabled,
    // icon,
    // tooltip,
}:IButton) => {
    return <button disabled={isDisabled} style={style} className={cx(css.defaultButton, className)} onClick={onClick}>
        {children}
    </button>
}

export default Button