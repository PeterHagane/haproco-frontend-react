import { routeTree } from './routeTree.gen'
import { NotFoundRoute, RouterProvider, createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root.tsx'



const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found',
})

const router = createRouter({
  routeTree,
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
