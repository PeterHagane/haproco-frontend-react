import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import DefaultLayout from '../layouts/PageLayout'

export const Route = createRootRoute({
  component: () => (
    <DefaultLayout>
      <Outlet />
      { process.env.APP_IS_DEV !== "false" && <TanStackRouterDevtools /> }
    </DefaultLayout>
  ),
})