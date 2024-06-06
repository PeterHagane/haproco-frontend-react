import cx from "classnames"
import css from "./Grid.module.scss"

export const Grid = ({
    children
}:{children?: React.ReactNode}) => {
    return <div className={cx(css.grid)} >
        {children}
    </div>

}

export default Grid
