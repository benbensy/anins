import { Card } from '@arco-design/web-react'

export interface ExtensionCardProps {
  children?: React.ReactNode
}

export function ExtensionCard({ children }: ExtensionCardProps) {
  return <Card hoverable>{children}</Card>
}
