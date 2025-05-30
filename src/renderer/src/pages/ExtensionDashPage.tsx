import { Button, Modal, Tooltip } from '@arco-design/web-react'
import { IconPlus } from '@arco-design/web-react/icon'
import MaterialSymbolsBox from '~icons/material-symbols/box'
import { ExtensionCard } from './Extension/ExtensionCard'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ExtensionImport } from './Extension/ExtensionImport'

export default function ExtensionDashPage() {
  const navigate = useNavigate()

  const [importVisible, setImportVisible] = useState(false)

  return (
    <div className="relative p-4 box-border min-h-full">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold flex flex-row gap-2">
          <div>Extension</div>
          <div className="flex flex-row gap-2">
            <Tooltip content="Install Extension from Gallery" position="bottom">
              <Button
                size="mini"
                icon={<MaterialSymbolsBox />}
                status="default"
                onClick={() => {
                  navigate('gallery', { relative: 'route' })
                }}
              ></Button>
            </Tooltip>
            <Tooltip content="Import Extension" position="bottom">
              <Button
                size="mini"
                icon={<IconPlus />}
                status="default"
                onClick={() => setImportVisible(true)}
              ></Button>
            </Tooltip>
            <Modal
              title="Import Local Extension"
              visible={importVisible}
              onOk={() => setImportVisible(false)}
              onCancel={() => setImportVisible(false)}
              unmountOnExit
            >
              <ExtensionImport />
            </Modal>
          </div>
        </div>
        <ExtensionCard>
          <div>123</div>
        </ExtensionCard>
      </div>
    </div>
  )
}
