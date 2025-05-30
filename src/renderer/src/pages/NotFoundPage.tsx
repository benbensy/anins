import { Button, Space } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 gap-6">
      <div className="text-8xl animate-bounce">👻</div>
      <div className="text-6xl font-bold text-indigo-400">404</div>
      <div className="text-2xl text-gray-600 mb-8 text-center">
        哎呀，页面跑丢啦～
        <div className="text-base text-gray-400 mt-2">(｡•́︿•̀｡) 让我们带它回家吧</div>
      </div>
      <Space>
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          className="hover:scale-105 transition-transform"
        >
          🔙 返回上一页
        </Button>
        <Button
          type="outline"
          onClick={() => navigate('/')}
          className="hover:scale-105 transition-transform"
        >
          🏠 返回首页
        </Button>
      </Space>
      <div className="mt-8 text-sm text-gray-400">或者... 你可以在这里思考下人生 🤔</div>
    </div>
  )
}
