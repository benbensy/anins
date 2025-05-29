import { SideBar } from '@renderer/components/features/SideBar'
import { TitleBar } from '@renderer/components/features/TitleBar'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar />
      <div className="w-full h-full">
        <div className="flex flex-col h-full">
          <TitleBar />
          <div className="flex-1 p-2 h-full flex-1 box-border">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}
