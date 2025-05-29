import MaterialSymbolsExtension from '~icons/material-symbols/extension'
import MaterialSymbolsHome from '~icons/material-symbols/home'
import MaterialSymbolsSettings from '~icons/material-symbols/settings'
import { NavMenu } from '../ui/NavMenu'

export function SideBar() {
  return (
    <div className="h-full">
      <NavMenu
        items={[
          {
            key: '1',
            label: 'Home',
            icon: <MaterialSymbolsHome />,
            to: '/'
          },
          {
            key: '2',
            label: 'Extension',
            icon: <MaterialSymbolsExtension />,
            to: '/extension'
          },
          {
            key: '3',
            label: 'Settings',
            icon: <MaterialSymbolsSettings />,
            to: '/settings'
          }
        ]}
      />
    </div>
  )
}
