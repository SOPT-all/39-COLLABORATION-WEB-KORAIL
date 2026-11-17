import SwapIcon from '@/shared/assets/icon-swap.svg'

interface StationSelectorProps {
  departureStation: string
  arrivalStation: string
}

const StationSelector = ({ departureStation, arrivalStation }: StationSelectorProps) => {
  return (
    <div className='grid w-full grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-center'>
      <div
        aria-label={`출발역 ${departureStation}`}
        className='flex h-[52px] min-w-0 flex-col items-start justify-center gap-2 text-left'
      >
        <span className='w-full text-label-12-r text-gray-600'>출발</span>
        <strong className='w-full text-subtitle-20-b whitespace-nowrap text-gray-900'>
          {departureStation}
        </strong>
      </div>

      <span aria-hidden='true' className='relative size-6'>
        <img alt='' aria-hidden='true' height={24} src={SwapIcon} width={24} />
      </span>

      <div
        aria-label={`도착역 ${arrivalStation}`}
        className='flex h-[52px] min-w-0 flex-col items-end justify-center gap-2 text-right'
      >
        <span className='w-full text-label-12-r text-gray-600'>도착</span>
        <strong className='w-full text-subtitle-20-b whitespace-nowrap text-gray-900'>
          {arrivalStation}
        </strong>
      </div>
    </div>
  )
}

export default StationSelector
