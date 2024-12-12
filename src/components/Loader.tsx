import cx from "classnames"
import css from "./Loader.module.scss"

export const Loader = ({}:{children?: React.ReactNode}) => {
    return <div className={cx(css.blur)} >
        <div className="loader"></div>
    </div>

}

export default Loader
