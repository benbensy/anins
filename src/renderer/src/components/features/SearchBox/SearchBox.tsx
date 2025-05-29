import { Form, Input, Popover } from '@arco-design/web-react'

import { IconSearch } from '@arco-design/web-react/icon'
import styles from './SearchBox.module.css'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export function SearchBox() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  async function handleSubmit(values: { keyword: string }) {
    if (values.keyword) {
      const searchParams = new URLSearchParams()
      searchParams.set('keyword', values.keyword)
      navigate(`/search?${searchParams}`, { replace: true })
    }
  }

  return (
    <Form form={form} layout="inline" onSubmit={handleSubmit}>
      <Popover content={<div>123</div>} trigger="focus" position="bottom">
        <Form.Item field="keyword" className="!m-0">
          <Input
            name="keyword"
            allowClear
            size="small"
            className={clsx(styles.SearchBox, 'min-w-md')}
            addAfter={<IconSearch className="py-2 px-3" onClick={form.submit} />}
            afterStyle={{ cursor: 'pointer', padding: '0' }}
            placeholder="搜索视频"
          />
        </Form.Item>
      </Popover>
    </Form>
  )
}
