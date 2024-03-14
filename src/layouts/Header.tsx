import cx from "classnames"
import css from "./Header.module.scss"
import { Link } from "@tanstack/react-router"
// import Button from "../components/Button"
// import { Dropdown as MUIDropdown } from '@mui/base/Dropdown';
// import { MenuButton } from '@mui/base/MenuButton';
// import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import Dropdown from "../components/Dropdown";

export const Header = ({
  children
}: {
  children?: React.ReactNode
}) => {

  const handleClick = (text: string) => {

    console.log(text)
  }

  return <div className={cx(css.headerContainer)}>
    <></>
    <Link to="/" className="unset">
      <button className="defaultButton">Home</button>
    </Link>
    <Link to="/about" className="unset">
      <button className="defaultButton">About</button>
    </Link>
    <Link id="dashboardLink" to="/dashboard" className="unset">
      <button className="defaultButton">Dashboard</button>
    </Link>
    <button className="defaultButton">Account</button>

    {/* <MUIDropdown>
      <MenuButton className="defaultButton">Account</MenuButton>
      <Menu slotProps={{ listbox: { className: "defaultButton" } }}>
        <MenuItem onClick={() => handleClick('Profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleClick('Language settings')}>
          Language settings
        </MenuItem>
        <MenuItem onClick={() => handleClick('Log out')}>Log out</MenuItem>
      </Menu>
    </MUIDropdown> */}

    <Dropdown mainButtonContent={<>Account</>}>
      <MenuItem onClick={() => handleClick('Profile')}>Profile</MenuItem>
      <MenuItem onClick={() => handleClick('Language settings')}>
        Language settings
      </MenuItem>
      <MenuItem onClick={() => handleClick('Log out')}>Log out</MenuItem>
    </Dropdown>

    {children}
  </div>
}

export default Header