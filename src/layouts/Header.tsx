import cx from "classnames"
import css from "./Header.module.scss"
import { MoonStars, Sun, Translate, User } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { appColourTheme } from "../stores/Theme";
import { notify } from "../components/Toast";
import { Theme } from "../util/RootColorVariables";
import { useTranslation } from "react-i18next";
import { locales } from "../components/LanguageButton";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dropdown } from "../components/DropdownRadix";
import { width } from "../App";
import { useNavigate } from "@tanstack/react-router";
import { Login } from "../components/Login";
import { changeStyle } from "../util/Utils";
import { usePocket } from "../stores/PocketBaseProvider";

export const sections = {
  home: { id: "home" },
  dashboard: { id: "dashboard" },
}

export const menuOptions = [
  { name: "Home", to: "/", id: sections.home.id },
  { name: "Dashboard", to: "/dashboard", id: sections.dashboard.id }
];

export const Header = ({
  children
}: {
  children?: React.ReactNode
}) => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useAtom(appColourTheme)
  const navigate = useNavigate()
  const { pb } = usePocket();

  const handleSetTheme = (theme: Theme) => {
    setTheme(theme)
    return theme
  }

  const notifyProps = (t: string) => {
    return {
      title: `${t} mode`,
      duration: 1000,
      icon: t === "dark" ? <MoonStars color={"var(--text-secondary)"}></MoonStars> : <Sun color={"var(--text-secondary)"}></Sun>
    }
  }

  return <div>
    <div
      className={cx(
        width > 6000 && css.fullWidth,
        css.headerContainer,
        "flex", "center",
      )}
    >


      <div className={cx("flex row marginLeftAuto")}>
        {menuOptions.map((o, i) => {
          return <button
            onClick={(e) => {
              navigate({ to: o.to })
              changeStyle(e.currentTarget as HTMLElement, "bounceChild", 200)
            }}
            key={i}
            className={cx("defaultButton")}>{t("buttons." + o.name.toLowerCase())}</button>
        })}

        {(process.env.APP_IS_DEV === "true" || !!pb?.authStore.isAdmin) &&
          <button onClick={() => {
            navigate({ to: "/sandbox" })
          }} style={{ color: "orangered" }} className={cx("defaultButton")} >
            Dev: Sandbox
          </button>}

        <button className={cx("buttonise padding")}
          onClick={(e) => {
            notify(notifyProps(handleSetTheme(theme === "dark" ? "light" : "dark")))
            changeStyle(e.currentTarget as HTMLElement, "bounceSVG", 200)
          }}>
          <Sun />
          <MoonStars />
        </button>
        <Dropdown
          onClick={(e) => changeStyle(e.currentTarget as HTMLElement, "bounceSVG", 200)}
          iconButtonClassName={"buttonise padding"}
          icon={<Translate size={20} />}>
          {locales.map((lang, i) => {
            return (<DropdownMenu.Item
              key={lang.lang + i}
              onClick={() => {
                i18n.changeLanguage(lang.locale)
                notify({
                  title: lang.lang,
                  duration: 1000,
                  icon: <Translate className="unset" color={"var(--text-secondary)"}></Translate>
                })
              }}
            >
              {lang.lang}
            </DropdownMenu.Item>)
          })}
        </Dropdown>

        <Dropdown
          onClick={(e) => changeStyle(e.currentTarget as HTMLElement, "bounceChild", 200)}
          iconButtonClassName={"buttonise padding"}
          icon={<User size={20} />}>
            {/* <DropdownMenu.Item> */}

              <Login>
              </Login>
            {/* </DropdownMenu.Item> */}
            
          {/* {
            userButtonOptions.map((option, i) => {
            return (<DropdownMenu.Item
              key={option.label + i}
              onClick={() => {
                option.func()
                notify({
                  title: option.label,
                  duration: 1000,
                  icon: <Translate className="unset" color={"var(--text-secondary)"}></Translate>
                })
              }}
            >
              {option.label}
            </DropdownMenu.Item>
            
            )
          })} */}

        </Dropdown>
        
      </div>
      {children}
    </div>
  </div>
}
// const userButtonOptions = [
//   {label: "signin", func: ()=> console.log("signin!"), el:
//   <form>
//     <input type=""></input>
//     <input type=""></input>
//     <input type="button"></input>
//   </form>}, 
//   {label: "signout", func: ()=> console.log("signout!")}, 
//   {label: "signup", func: ()=> console.log("signup!")}, 
// ]

export default Header