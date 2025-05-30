export default defineConfig(() => {
  return {
    name: 'demo',
    id: 'demo',
    version: '1.0.0',
    url: 'https://github.com/indusy/anins',
    author: 'indusy',
    fetchers: {
      search: (query: string) => {
        return Promise.resolve([])
      }
    }
  }
})
