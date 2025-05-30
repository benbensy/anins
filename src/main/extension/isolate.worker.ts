import { workerData, parentPort, isMainThread } from 'node:worker_threads'
import vm from 'node:vm'
import { transform } from '@swc/core'
import { defineConfig } from './define'

if (!isMainThread && parentPort) {
  const { id, args, action } = workerData

  if (action === 'get-info') {
    parse(id, args[0])
  }
}

async function parse(id: string, code: string) {
  const context = {
    console,
    URL,
    TextEncoder,
    TextDecoder,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    setImmediate,
    clearImmediate,
    queueMicrotask,
    process
  }

  try {
    const { code: commonjsCode } = await transform(code, {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: false
        },
        target: 'es2020',
        keepClassNames: true
      },
      module: {
        type: 'commonjs',
        strict: false,
        strictMode: true,
        lazy: false,
        ignoreDynamic: true
      }
    })

    const sandbox = {
      ...context,
      defineConfig,
      exports: {},
      console: console
    }

    const vmContext = vm.createContext(sandbox)

    const script = new vm.Script(commonjsCode)
    script.runInContext(vmContext, {
      displayErrors: true,
      timeout: 5000
    })

    const result = JSON.parse(JSON.stringify(sandbox.exports))

    parentPort?.postMessage({
      id,
      type: 'result',
      result
    })
  } catch (error) {
    parentPort?.postMessage({
      id,
      type: 'error',
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
