import cx from "classnames"
import css from "./Footer.module.scss"
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";

import { atom, useAtom } from "jotai";


export const bottomInView = atom(false)

export const Footer = ({
    children
}: {
    children?: React.ReactNode
}) => {
    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: false
    });

    const [, setFooterInView] = useAtom(bottomInView)

    useEffect(()=>{
        setFooterInView(inView)
    },[inView])

    return <div ref={ref}>
        <div className={cx(css.footerContainer, css.fullWidth, "flex row")}>
            {children}
            {/* <BottomScrollButton inView={inView}></BottomScrollButton> */}
        </div>
    </div>
}


export default Footer