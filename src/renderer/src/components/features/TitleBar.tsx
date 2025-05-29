import MaterialSymbolsCloseRounded from '~icons/material-symbols/close-rounded'
import MaterialSymbolsCrop54Outline from '~icons/material-symbols/crop-5-4-outline'
import MaterialSymbolsRemoveRounded from '~icons/material-symbols/remove-rounded'

import Logo from '../../../../../resources/icon.png'

import { SearchBox } from './SearchBox/SearchBox'
import { Image } from '@arco-design/web-react'

export function TitleBar() {
  const handleMinimize = () => {
    window.api.minimizeWindow()
  }

  const handleToggleMaximize = () => {
    window.api.toggleMaximizeWindow()
  }

  const handleClose = () => {
    window.api.closeWindow()
  }

  return (
    <div
      className="sticky top-0 z-10 w-full flex flex-row justify-between items-center gap-2 p-2 box-border border-b-solid border-b-[1px] border-gray-200"
      style={{ appRegion: 'drag' }}
    >
      <div className="flex flex-row items-center gap-2 px-1.5">
        <Image simple height={20} src={Logo} />
        <span
          className="text-lg font-bold"
          style={{ fontFamily: 'Comic Neue', color: 'rgb(var(--primary-6))' }}
        >
          ANINS
        </span>
      </div>
      <div style={{ appRegion: 'no-drag' }}>
        <SearchBox />
      </div>
      <div className="flex flex-row items-center gap-2" style={{ appRegion: 'no-drag' }}>
        <MaterialSymbolsRemoveRounded className="cursor-pointer" onClick={handleMinimize} />
        <MaterialSymbolsCrop54Outline className="cursor-pointer" onClick={handleToggleMaximize} />
        <MaterialSymbolsCloseRounded className="cursor-pointer" onClick={handleClose} />
      </div>
    </div>
  )
}
