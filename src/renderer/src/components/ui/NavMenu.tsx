import Icon from '~icons/material-symbols/home'

import { Menu, Tooltip } from '@arco-design/web-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

type IconType = typeof Icon

export interface NavMenuMenuItem {
  key: string
  label: string
  icon: IconType
  to: string
}

export function NavMenu({ items }: { items: NavMenuMenuItem[] }) {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    const currentItem = items.find((item) => location.pathname === item.to)
    if (currentItem) {
      setSelectedKeys([currentItem.key])
    } else {
      setSelectedKeys([])
    }
  }, [location.pathname, items])

  return (
    <Menu selectedKeys={selectedKeys} style={{ appRegion: 'no-drag' }}>
      {items.map(({ key, to, icon: IconComponent, label }) => (
        <Tooltip key={key} content={label} trigger="hover" position="right">
          <NavLink to={to}>
            <Menu.Item key={key}>
              <IconComponent className="align-middle" />
            </Menu.Item>
          </NavLink>
        </Tooltip>
      ))}
    </Menu>
  )
}
