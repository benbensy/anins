import { useSearchParams } from 'react-router-dom'

export default function SearchPage() {
  const [searchParams] = useSearchParams()

  return <div className="p-4 min-h-full">SearchPage {searchParams.get('keyword')}</div>
}
