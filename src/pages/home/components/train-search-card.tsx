import { useState } from 'react'

import SwapIcon from '@/shared/assets/icon-swap.svg?react'
import Button from '@/shared/components/button'

interface TrainSearchCardProps {
  onSearch: () => void
}

const TrainSearchCard = ({ onSearch }: TrainSearchCardProps) => {
  const [stations, setStations] = useState({
    departure: '서울',
    arrival: '부산',
  })

  const handleStationSwap = () => {
    setStations(({ departure, arrival }) => ({
      departure: arrival,
      arrival: departure,
    }))
  }

  return (
    <section
      aria-label='열차 조회 조건'
      className='flex w-full flex-col gap-4 rounded-12 bg-gray-0 p-4 shadow-[0_0_2px_0_rgba(0,0,0,0.08)]'
    >
      <div className='grid grid-cols-[1fr_24px_1fr] items-center gap-2'>
        <div className='flex flex-col gap-2'>
          <span className='text-label-12-r text-gray-600'>출발</span>
          <span className='text-subtitle-20-b text-gray-900'>{stations.departure}</span>
        </div>

        <button
          aria-label='출발역과 도착역 교환'
          className='size-6'
          onClick={handleStationSwap}
          type='button'
        >
          <SwapIcon aria-hidden='true' focusable='false' />
        </button>

        <div className='flex flex-col gap-2 text-right'>
          <span className='text-label-12-r text-gray-600'>도착</span>
          <span className='text-subtitle-20-b text-gray-900'>{stations.arrival}</span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-[13px]'>
        <div className='flex min-w-0 flex-col gap-1 rounded-8 bg-slate-50 p-2'>
          <span className='text-label-12-r text-gray-600'>출발일</span>
          <span className='text-body-14-m break-keep text-gray-900'>10월28일 13시 이후</span>
        </div>

        <div className='flex min-w-0 flex-col gap-1 rounded-8 bg-slate-50 p-2'>
          <span className='text-label-12-r text-gray-600'>인원</span>
          <span className='text-body-14-m text-gray-900'>어른 1명</span>
        </div>
      </div>

      <Button variant='primary' width={311} className='max-w-full self-center' onClick={onSearch}>
        열차조회하기
      </Button>
    </section>
  )
}

export default TrainSearchCard
