import IsolateWorker from './isolate.worker?modulePath'
import { Worker } from 'node:worker_threads'
import { v4 as uuid } from 'uuid'
import { Extension } from './define'
import { omit } from 'es-toolkit'

export function getExtensionInfo(code: string) {
  return new Promise<Omit<Extension, 'fetchers'>>((resolve, reject) => {
    const worker = new Worker(IsolateWorker, {
      workerData: {
        id: uuid(),
        action: 'get-info',
        args: [code]
      }
    })

    worker.on('message', (message) => {
      if (message.type === 'result') {
        worker.terminate()
        const info = omit(message.result.default as Extension, ['fetchers'])
        resolve(info)
      } else if (message.type === 'error') {
        worker.terminate()
        reject(new Error(message.error))
      }
    })

    worker.on('error', (error) => {
      worker.terminate()
      reject(error)
    })

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}
