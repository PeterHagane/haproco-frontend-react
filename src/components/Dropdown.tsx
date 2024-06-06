import cx from "classnames"
import css from "./Dropdown.module.scss"
import { Dropdown as MuiDropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { useState } from "react";

interface IDropdown {
    className?: string
    style?: React.CSSProperties
    onClick?: (param: any) => void,
    icon?: JSX.Element
    mainButtonContent?: JSX.Element
    tooltip?: string
    isDisabled?: boolean
    children?: React.ReactNode
    isOpenExternal?: boolean
    setIsOpenExternal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dropdown = ({
    className,
    children,
    mainButtonContent,
    icon,
    isOpenExternal,
    setIsOpenExternal
    // onClick,
    // style, 
    // isDisabled,
    // // tooltip,
}: IDropdown) => {
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <MuiDropdown open={isOpenExternal ? isOpenExternal : isOpen } onOpenChange={()=>{
            !!setIsOpenExternal && setIsOpenExternal(!isOpenExternal)            
            !setIsOpenExternal && setIsOpen(!isOpen)
            }}
            >
            <MenuButton
            className={cx(!icon && "defaultButton", className)}>
                {mainButtonContent}{icon}
            </MenuButton>
            <Menu slotProps={{
                listbox: { className: cx("unset", css.listBox) }, 
                root: { className: css.root } }}>
                {children}
            </Menu>
        </MuiDropdown>
    </>

}

export default Dropdown


