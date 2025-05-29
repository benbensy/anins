import MaterialSymbolsCloseRounded from '~icons/material-symbols/close-rounded'
import MaterialSymbolsCrop54Outline from '~icons/material-symbols/crop-5-4-outline'
import MaterialSymbolsRemoveRounded from '~icons/material-symbols/remove-rounded'
import MaterialSymbolsArrowBackRounded from '~icons/material-symbols/arrow-back-rounded'

import Logo from '../../../../../resources/icon.png'

import { SearchBox } from './SearchBox/SearchBox'
import { Button, Image } from '@arco-design/web-react'

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
      className="sticky top-0 z-10 w-full flex flex-row justify-between items-center gap-2 p-2 box-border"
      style={{ appRegion: 'drag' }}
    >
      <div className="flex flex-row items-center gap-2 px-1.5">
        <Button
          style={{ appRegion: 'no-drag', color: 'var(--color-text-2)' }}
          type="text"
          status="default"
          icon={<MaterialSymbolsArrowBackRounded />}
        />
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
