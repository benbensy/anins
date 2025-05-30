import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const BaseLayout = lazy(() => import('../layouts/BaseLayout'))
const IndexPage = lazy(() => import('../pages/IndexPage'))
const SearchPage = lazy(() => import('../pages/SearchPage'))
const ExtensionDash = lazy(() => import('../pages/ExtensionDashPage'))
const ExtensionGallery = lazy(() => import('../pages/ExtensionGalleryPage'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'extension',
        element: <ExtensionDash />
      },
      {
        path: 'extension/gallery',
        element: <ExtensionGallery />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
