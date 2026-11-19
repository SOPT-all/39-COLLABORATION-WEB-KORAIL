import { useNavigate } from 'react-router'

import HomeExternalLinks from '@/pages/home/components/home-external-links'
import TrainSearchCard from '@/pages/home/components/train-search-card'
import HomeShortcuts from '@/pages/home/components/home-shortcuts'
import HomeFooter from '@/pages/home/components/home-footer'

const HomePage = () => {
  const navigate = useNavigate()

  const handleTrainSearch = () => {
    navigate('/train-search')
  }

  return (
    <>
      <main className='bg-slate-50 px-[14px] pt-[17px] pb-[177px]'>
        <h1 className='sr-only'>승차권 예매 홈</h1>

        <div className='mx-auto flex w-full max-w-[344px] flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <HomeExternalLinks />

            <div className='mx-auto w-full max-w-[343px]'>
              <TrainSearchCard onSearch={handleTrainSearch} />
            </div>
          </div>

          <HomeShortcuts />
        </div>
      </main>

      <HomeFooter />
    </>
  )
}

export default HomePage
