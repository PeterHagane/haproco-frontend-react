// import { useState } from "react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import css from "./DropdownRadix.module.scss"
import cx from "classnames";

interface IDropdown {
    className?: string
    iconButtonClassName?: string
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

const DropdownRadix = ({
    className,
    children,
    mainButtonContent,
    iconButtonClassName,
    icon,
    // isOpenExternal,
    setIsOpenExternal,
    onClick,
    style, 
    // isDisabled,
    // // tooltip,
}: IDropdown) => {

    return <>
        <DropdownMenu.Root modal={false} onOpenChange={(e) => { setIsOpenExternal && setIsOpenExternal(e) }}>
            <DropdownMenu.Trigger asChild>
                <button onClick={onClick} className={cx("flex center iconButton", iconButtonClassName)} aria-label="Customise options">
                    {mainButtonContent}{icon}
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal >
                <DropdownMenu.Content style={style} className={cx(css.dropdownMenuContent, "shadow", className)} >
                    {children}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </>
}

const DropdownRadixSub = ({
    className,
    children,
    mainButtonContent,
    iconButtonClassName,
    icon,
    // isOpenExternal,
    // setIsOpenExternal
    // onClick,
    // style, 
    // isDisabled,
    // // tooltip,
}: IDropdown) => {

    return <>
        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger asChild>
                <button className={cx("flex center", iconButtonClassName)}>
                    {mainButtonContent}{icon}
                </button>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                    // className="DropdownMenuSubContent"
                    // sideOffset={2}
                    // alignOffset={-5}
                    className={cx(css.dropdownMenuContent, "shadow", className)}
                >
                    {children}
                    {/* <DropdownMenu.Item className="DropdownMenuItem">
                    </DropdownMenu.Item> */}
                </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
        </DropdownMenu.Sub>
    </>
}


export default DropdownRadix
export const Dropdown = DropdownRadix
export const DropdownSub = DropdownRadixSub