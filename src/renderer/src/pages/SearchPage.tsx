import { useSearchParams } from 'react-router-dom'

export default function SearchPage() {
  const [searchParams] = useSearchParams()

  return <div>SearchPage {searchParams.get('keyword')}</div>
}
