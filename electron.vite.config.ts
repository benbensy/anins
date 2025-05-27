import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react-swc'
import yaml from '@modyfi/vite-plugin-yaml'
import unocss from 'unocss/vite'
import { presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), yaml()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      icons({ compiler: 'jsx', jsx: 'react' }),
      unocss({
        presets: [presetWind3()],
        transformers: [transformerDirectives(), transformerVariantGroup()]
      })
    ]
  }
})
