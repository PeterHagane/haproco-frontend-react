import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { PageLayout } from '../layouts/PageLayout'
import { useEffect } from 'react'
// import { useAtom } from 'jotai'
// import { appColourTheme } from '../stores/Theme'

export const Route = createRootRoute({
  component: () =>  {

    // const [theme] = useAtom(appColourTheme)
    // const tempbg = theme === "dark" ? "rgb(18, 18, 18)" : theme === "light" ? "rgb(245, 245, 245)" : "" //remove the 

    useEffect(()=>{
      document.getElementById("body")?.setAttribute("style", `background-color: ""`)
    })

    return <>
      <PageLayout>
        <Outlet />
        {process.env.APP_IS_DEV !== "false" && <TanStackRouterDevtools />}
      </PageLayout>
    </>
    },
})