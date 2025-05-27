import TablerCrop54 from '~icons/tabler/crop-5-4'
import TablerMinus from '~icons/tabler/minus'
import TablerX from '~icons/tabler/x'

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
      className="flex flex-row items-center justify-between gap-2 p-2"
      style={{ appRegion: 'drag' }}
    >
      <div></div>
      <div></div>
      <div className="flex flex-row items-center gap-2" style={{ appRegion: 'no-drag' }}>
        <TablerMinus className="cursor-pointer" onClick={handleMinimize} />
        <TablerCrop54 className="cursor-pointer" onClick={handleToggleMaximize} />
        <TablerX className="cursor-pointer" onClick={handleClose} />
      </div>
    </div>
  )
}
