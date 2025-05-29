import { ConfigProvider } from '@arco-design/web-react'
import { Outlet, RouterProvider } from 'react-router-dom'
import { router } from './router'

export default function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </ConfigProvider>
  )
}
