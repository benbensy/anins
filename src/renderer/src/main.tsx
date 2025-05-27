import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import '@arco-design/web-react/dist/css/arco.css'
import './styles/global.css'

import 'uno.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
