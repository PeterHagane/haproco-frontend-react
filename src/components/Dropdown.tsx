import cx from "classnames"
import css from "./Dropdown.module.scss"
import { Dropdown as MuiDropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
// import { MenuItem } from '@mui/base/MenuItem';
// import { hashKeys } from 'react-style-tag';

interface IDropdown {
    className?: string
    style?: React.CSSProperties
    onClick?: (param: any) => void,
    icon?: JSX.Element
    mainButtonContent: JSX.Element
    tooltip?: string
    isDisabled?: boolean
    children?: React.ReactNode
}

// const { red } = hashKeys(['red']);

export const Dropdown = ({
    className,
    children,
    mainButtonContent,
    // onClick,
    // style, 
    // isDisabled,
    // // icon,
    // // tooltip,
}: IDropdown) => {
    return <>
        <MuiDropdown>
            <MenuButton className={cx("defaultButton", className)}>{mainButtonContent}</MenuButton>
            <Menu slotProps={{ listbox: { className: cx("unset", css.listBox) } }}>
                {children}
            </Menu>
        </MuiDropdown>



        {/* <Style>
            {
                `
            .${red}{
                color: red;
            }
            `
            }
        </Style> */}
    </>

}

export default Dropdown


