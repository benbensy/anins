import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const PORT = Number(import.meta.env.VITE_API_PORT)

async function main() {
  const app = new Hono()

  app.get('/', (c) => {
    return c.text('Hello Hono!')
  })

  try {
    const server = serve({
      fetch: app.fetch,
      port: PORT
    })

    console.log(`Server running at http://localhost:${PORT}`)

    process.on('SIGINT', () => {
      server.close()
      process.exit(0)
    })
    process.on('SIGTERM', () => {
      server.close((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        process.exit(0)
      })
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

main()
