import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { PageLayout } from '../layouts/PageLayout'
import { usePocket } from '../stores/PocketBaseProvider'
import LoginPage from '../pages/LoginPage'
export const Route = createRootRoute({
  component: () => {
    const { isSignedIn } = usePocket()
    const routerState = useRouterState()
    
    return <PageLayout>
      {isSignedIn || routerState.location.pathname === "/login" ? <Outlet/> : <LoginPage loginMessage={routerState.location.pathname !== "/" ? "Sign in to access this page." : ""}></LoginPage>} 
      {process.env.APP_IS_DEV !== "false" && <TanStackRouterDevtools />}
    </PageLayout>
  },
})