import { ExtensionCard } from './ExtensionPage/ExtensionCard'

export default function ExtensionPage() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">Extension</div>
        <div className="grid grid-cols-3 gap-2">
          <ExtensionCard>
            <div>123</div>
          </ExtensionCard>
        </div>
      </div>
    </div>
  )
}
