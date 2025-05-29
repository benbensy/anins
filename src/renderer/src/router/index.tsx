import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const BaseLayout = lazy(() => import('../layouts/BaseLayout'))
const IndexPage = lazy(() => import('../pages/IndexPage'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const ExtensionPage = lazy(() => import('../pages/ExtensionPage'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />
      },
      {
        path: '/search',
        element: <SearchPage />
      },
      {
        path: '/extension',
        element: <ExtensionPage />
      },
      {
        path: '*',
        element: <div>404</div>
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
