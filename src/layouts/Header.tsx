import cx from "classnames"
import css from "./Header.module.scss"
import { MoonStars, Sun, Translate } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { appColourTheme } from "../stores/Theme";
import { notify } from "../components/Toast";
import { Theme } from "../util/RootColorVariables";
import { sections } from "../pages/MainPage";
import { useTranslation } from "react-i18next";
import { locales } from "../components/LanguageButton";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Dropdown } from "../components/DropdownRadix";
import { width } from "../App";
import { useNavigate } from "@tanstack/react-router";

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
            onClick={() => {
              navigate({ to: o.to })
            }}
            key={i}
            className={cx("defaultButton")}>{t("buttons." + o.name.toLowerCase())}</button>
        })}

        {process.env.APP_IS_DEV === "true" &&
          <button onClick={() => {
            navigate({ to: "/sandbox" })
          }} style={{ color: "orangered" }} className={cx("defaultButton")} >
            Dev: Sandbox
          </button>}

        <button className={cx("buttonise padding")}
          onClick={() => {
            notify(notifyProps(handleSetTheme(theme === "dark" ? "light" : "dark")))
          }}>
          <Sun />
          <MoonStars />
        </button>
        <Dropdown
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
      </div>
      {children}
    </div>
  </div>
}


export default Header