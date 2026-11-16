import { useNavigate } from 'react-router'

import TrainSearchCard from '@/pages/home/components/train-search-card'

const HomePage = () => {
  const navigate = useNavigate()

  const handleTrainSearch = () => {
    navigate('/train-search')
  }

  return (
    <main className='bg-slate-50 p-4'>
      <h1 className='sr-only'>승차권 예매 홈</h1>
      <TrainSearchCard onSearch={handleTrainSearch} />
    </main>
  )
}

export default HomePage
