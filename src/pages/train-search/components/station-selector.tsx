import SwapIcon from '@/shared/assets/icon-swap.svg'

interface StationSelectorProps {
  departureStation: string
  arrivalStation: string
  onDepartureStationClick: () => void
  onArrivalStationClick: () => void
  onSwapStationsClick: () => void
}

const StationSelector = ({
  departureStation,
  arrivalStation,
  onDepartureStationClick,
  onArrivalStationClick,
  onSwapStationsClick,
}: StationSelectorProps) => {
  return (
    <div className='grid w-full grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-center'>
      <button
        type='button'
        aria-label={`출발역 ${departureStation} 선택`}
        className='flex h-[52px] min-w-0 flex-col items-start justify-center gap-2 text-left'
        onClick={onDepartureStationClick}
      >
        <span className='w-full text-label-12-r text-gray-600'>출발</span>
        <strong className='w-full text-subtitle-20-b whitespace-nowrap text-gray-900'>
          {departureStation}
        </strong>
      </button>

      <button
        type='button'
        aria-label='출발역과 도착역 바꾸기'
        className='relative size-6 after:absolute after:-inset-2'
        onClick={onSwapStationsClick}
      >
        <img alt='' aria-hidden='true' height={24} src={SwapIcon} width={24} />
      </button>

      <button
        type='button'
        aria-label={`도착역 ${arrivalStation} 선택`}
        className='flex h-[52px] min-w-0 flex-col items-end justify-center gap-2 text-right'
        onClick={onArrivalStationClick}
      >
        <span className='w-full text-label-12-r text-gray-600'>도착</span>
        <strong className='w-full text-subtitle-20-b whitespace-nowrap text-gray-900'>
          {arrivalStation}
        </strong>
      </button>
    </div>
  )
}

export default StationSelector
