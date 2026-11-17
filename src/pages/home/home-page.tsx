import { useNavigate } from 'react-router'

import HomeExternalLinks from '@/pages/home/components/home-external-links'
import TrainSearchCard from '@/pages/home/components/train-search-card'

const HomePage = () => {
  const navigate = useNavigate()

  const handleTrainSearch = () => {
    navigate('/train-search')
  }

  return (
    <main className='bg-slate-50 p-4'>
      <h1 className='sr-only'>승차권 예매 홈</h1>

      <div className='flex flex-col gap-2'>
        <HomeExternalLinks />
        <TrainSearchCard onSearch={handleTrainSearch} />
      </div>
    </main>
  )
}

export default HomePage
