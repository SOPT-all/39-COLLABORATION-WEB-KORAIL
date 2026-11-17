import SwapIcon from '@/shared/assets/icon-swap.svg?react'
import Button from '@/shared/components/button'

interface TrainSearchCardProps {
  onSearch: () => void
}

const TrainSearchCard = ({ onSearch }: TrainSearchCardProps) => {
  return (
    <section
      aria-label='열차 조회 조건'
      className='flex w-full flex-col gap-4 rounded-12 bg-gray-0 p-4 shadow-[0_0_2px_0_rgba(0,0,0,0.08)]'
    >
      <div className='grid grid-cols-[1fr_24px_1fr] items-center gap-2'>
        {/* 바깥 div에 grid를 적용 -> 바로 안쪽에 있는 세 요소를 칸에 배치 */}
        {/* grid-cols-[1fr_24px_1fr] -> 첫 칸(1fr) 두번째 칸(24px) 세번째 칸(1fr) */}
        <div className='flex flex-col gap-2'>
          <span className='text-label-12-r text-gray-600'>출발</span>
          <span className='text-subtitle-20-b text-gray-900'>서울</span>
        </div>

        <SwapIcon aria-hidden='true' focusable='false' />

        <div className='flex flex-col gap-2 text-right'>
          <span className='text-label-12-r text-gray-600'>도착</span>
          <span className='text-subtitle-20-b text-gray-900'>부산</span>
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
