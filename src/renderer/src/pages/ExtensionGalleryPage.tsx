import { Button, Input } from '@arco-design/web-react'
import MaterialSymbolsArrowBackRounded from '~icons/material-symbols/arrow-back-rounded'
import { useNavigate } from 'react-router-dom'

export default function ExtensionGalleryPage() {
  const navigate = useNavigate()

  return (
    <div className="relative p-4 box-border min-h-full">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold flex flex-row gap-2">
          <Button
            size="small"
            icon={<MaterialSymbolsArrowBackRounded />}
            onClick={() => navigate(-1)}
          ></Button>
          <div>Extension Gallery</div>
          <div className="flex flex-row gap-2">
            <Input.Search size="small" />
          </div>
        </div>
        <div>搜索扩展</div>
      </div>
    </div>
  )
}
