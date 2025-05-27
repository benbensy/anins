/* eslint-disable @typescript-eslint/no-explicit-any */

import { Worker } from 'node:worker_threads'
import IsolateWorker from './isolate.worker?modulePath'

export function executeInIsolatedContext(
  code: string,
  functionName: string,
  args: any[] = []
): Promise<any> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(IsolateWorker, {
      workerData: {
        id: Math.random().toString(36).substring(7),
        code,
        functionName,
        args
      }
    })

    worker.on('message', (message) => {
      if (message.type === 'result') {
        worker.terminate()
        resolve(message.result)
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
