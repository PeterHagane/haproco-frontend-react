import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { Route as rootRoute } from './routes/__root.tsx'
import { useAtom } from 'jotai'
// import css from "./layouts/App.Themes.module.scss"
import { Suspense, useEffect } from 'react'
import { setRootColorVars } from './util/RootColorVariables.ts'
import { appColourTheme } from './stores/Theme.ts'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PocketBaseProvider } from './stores/PocketBaseProvider.tsx'
// import { notFound } from './routes/_notFound.tsx'
import "./i18n/config.js"

export const height = window.innerHeight
export const width = window.innerWidth

// const notFoundRoute = new NotFoundRoute({
//   getParentRoute: () => rootRoute,
//   component: () => '404 Not Found',
// })

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined
  },
  // globalNotFound: notFound
  // notFoundRoute,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

function App() {

  const [theme] = useAtom(appColourTheme)

  useEffect(() => {
    setRootColorVars(theme)
  }, [theme])

  return (
    <div id="app" className='stylesetDefault'>
      {/* Suspense to prevent react error 426 (resources loading)*/}
      {/* Empty fragment could be "Loading...", but the loading takes a fraction of a second */}
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<></>}>
          <PocketBaseProvider>
            <RouterProvider router={router} />
            <Toaster />
          </PocketBaseProvider>
        </Suspense>
      </QueryClientProvider>
    </div>
  )
}

export default App
