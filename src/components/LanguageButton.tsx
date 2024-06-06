import { Translate } from "@phosphor-icons/react"
import Dropdown from "./Dropdown"
import { MenuItem } from "@mui/base/MenuItem"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { notify } from "./Toast"



export const locales = [
  {locale: "en", lang: "English"}, 
  {locale: "nb", lang: "Norsk"}
]

export const LanguageButton =(
  {isMenuItem}:{isMenuItem?: boolean}
)=>{
    const [isOpen, setIsOpen] = useState(false)
    const { i18n } = useTranslation();
  
    console.log(isMenuItem)
    return(
        <Dropdown
            setIsOpenExternal={setIsOpen}
            isOpenExternal={isOpen}
            icon={
              <Translate className={isMenuItem ? "" : "iconButton"} size={20}></Translate>
            }
          >
              {locales.map((lang, i) => {
                return (<MenuItem key={i + lang.locale}>
                  <button 
                    onClick={()=>{
                      i18n.changeLanguage(lang.locale)
                      notify(  {
                         title: lang.lang,
                         duration: 1000,
                         icon: <Translate className="unset" color={"var(--text-secondary)"}></Translate>
                      })
                    }}>
                    {lang.lang}
                  </button>
              </MenuItem>)
            })}

          </Dropdown>
    )
}