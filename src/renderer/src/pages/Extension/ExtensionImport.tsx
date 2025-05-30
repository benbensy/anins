import { Form, Input, Upload, Message } from '@arco-design/web-react'
import { UploadItem } from '@arco-design/web-react/es/Upload'
import { useEffect, useState } from 'react'
import { Extension } from '@renderer/types/extension'
import { useForm, Controller } from 'react-hook-form'

interface FormData {
  uploadList: UploadItem[]
  info: Omit<Extension, 'fetchers'>
}

export function ExtensionImport() {
  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: {
      uploadList: [],
      info: {
        name: '',
        version: '',
        author: '',
        url: '',
        id: ''
      }
    }
  })

  const [, setCode] = useState<string | null>(null)

  const uploadList = watch('uploadList')
  const showInfo = uploadList?.length > 0

  useEffect(() => {
    const file = uploadList?.[0]?.originFile

    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (e.target?.result) {
          const code = e.target.result as string
          setCode(code)
          try {
            const info = await window.api.getExtensionInfo(code)
            setValue('info', info)
          } catch (error) {
            Message.error('Failed to parse extension info')
            console.error(error)
          }
        }
      }
      reader.readAsText(file)
    } else {
      setCode(null)
      setValue('info', {
        name: '',
        version: '',
        author: '',
        url: '',
        id: ''
      })
    }
  }, [uploadList, setValue])

  return (
    <Form>
      <Form.Item label="File">
        <Controller
          name="uploadList"
          control={control}
          render={({ field }) => (
            <Upload
              autoUpload={false}
              action=""
              accept=".js,.ts"
              multiple={false}
              limit={1}
              fileList={field.value || []}
              onChange={(fileList) => field.onChange(fileList)}
            />
          )}
        />
      </Form.Item>
      {showInfo && (
        <>
          <Form.Item label="Name">
            <Controller
              name="info.name"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
          <Form.Item label="Version">
            <Controller
              name="info.version"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
          <Form.Item label="Author">
            <Controller
              name="info.author"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
          <Form.Item label="URL">
            <Controller
              name="info.url"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
          <Form.Item label="ID">
            <Controller
              name="info.id"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
        </>
      )}
    </Form>
  )
}
