// src/main/extension/isolate.worker.ts
import { workerData, parentPort, isMainThread } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'
import { transform } from '@swc/core'

if (!isMainThread && parentPort) {
  const { id, code, functionName, args } = workerData

  const context = {
    require,
    console,
    module: { exports: {} },
    exports: {},
    __filename: fileURLToPath(import.meta.url),
    __dirname: fileURLToPath(new URL('.', import.meta.url)),
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

  async function execute() {
    try {
      const { code: commonjsCode } = await transform(code, {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: false
          },
          target: 'es2020'
        },
        module: {
          type: 'commonjs',
          strict: false,
          strictMode: true,
          lazy: false,
          ignoreDynamic: true
        }
      })

      const fn = new Function(`
        'use strict';
        const module = { exports: {} };
        const exports = module.exports;
        ${commonjsCode}
        return module.exports.${functionName} || ${functionName};
      `).call(context)

      if (typeof fn !== 'function') {
        throw new Error(`Expected ${functionName} to be a function, got ${typeof fn}`)
      }

      const result = await Promise.resolve(fn(...args))

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

  execute()
}
