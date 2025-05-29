import { Form, Input, Popover } from '@arco-design/web-react'

import { useBoundStore } from '@renderer/store'
import { IconSearch } from '@arco-design/web-react/icon'
import styles from './SearchBox.module.css'
import clsx from 'clsx'

export function SearchBox() {
  const [form] = Form.useForm()

  const { keyword } = useBoundStore((state) => state.search)

  console.log(keyword)

  async function handleSubmit(values: { keyword: string }) {
    if (values.keyword) {
      console.log(values.keyword)
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
          />
        </Form.Item>
      </Popover>
    </Form>
  )
}
