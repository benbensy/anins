import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const BaseLayout = lazy(() => import('../layouts/BaseLayout'))
const IndexPage = lazy(() => import('../pages/IndexPage'))

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
        path: '*',
        element: <div>404</div>
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
