import { Menu } from '@arco-design/web-react'
import { NavLink } from 'react-router-dom'

export interface NavMenuMenuItem {
  key: string
  label: string
  icon: React.ReactNode
  to: string
}

export function NavMenu({ items }: { items: NavMenuMenuItem[] }) {
  return (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <NavLink to={item.to}>{item.icon}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  )
}
