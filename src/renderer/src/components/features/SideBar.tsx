import MaterialSymbolsArrowBackRounded from '~icons/material-symbols/arrow-back-rounded'
import MaterialSymbolsExtension from '~icons/material-symbols/extension'
import MaterialSymbolsHome from '~icons/material-symbols/home'
import MaterialSymbolsSettings from '~icons/material-symbols/settings'
import { Button } from '@arco-design/web-react'
import { NavMenu } from '../ui/NavMenu'
import { useNavigate } from 'react-router-dom'

export function SideBar() {
  const navigate = useNavigate()

  const items = [
    {
      key: '1',
      label: 'Home',
      icon: MaterialSymbolsHome,
      to: '/'
    },
    {
      key: '2',
      label: 'Extension',
      icon: MaterialSymbolsExtension,
      to: '/extension'
    },
    {
      key: '3',
      label: 'Settings',
      icon: MaterialSymbolsSettings,
      to: '/settings'
    }
  ]

  return (
    <div
      className="h-full flex flex-col items-center gap-2 py-2 box-border border-r-solid border-r-[1px] border-gray-200"
      style={{ appRegion: 'drag' }}
    >
      <Button
        style={{ appRegion: 'no-drag', color: 'var(--color-text-2)' }}
        type="text"
        status="default"
        icon={<MaterialSymbolsArrowBackRounded />}
        onClick={() => navigate(-1)}
      />
      <NavMenu items={items} />
    </div>
  )
}
