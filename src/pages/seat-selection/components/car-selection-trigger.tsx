import RemainingSeatCount from '@/pages/seat-selection/components/remaining-seat-count'
import ChevronDownIcon from '@/shared/assets/icon-chevron-down.svg?react'

interface CarSelectionTriggerProps {
  coachNumber: number
  remainingSeatCount: number
  totalSeatCount: number
  onClick: () => void
}

const CarSelectionTrigger = ({
  coachNumber,
  remainingSeatCount,
  totalSeatCount,
  onClick,
}: CarSelectionTriggerProps) => (
  <button
    type='button'
    aria-haspopup='dialog'
    className='flex min-h-[45px] w-full items-center justify-between gap-2 border-t border-gray-100 bg-gray-0 py-2.5 pr-[26px] pl-8 text-left text-gray-900'
    onClick={onClick}
  >
    <span className='text-heading-16-b'>일반실 {coachNumber}호차</span>

    <span className='flex shrink-0 items-center'>
      <RemainingSeatCount
        remainingSeatCount={remainingSeatCount}
        totalSeatCount={totalSeatCount}
        variant='trigger'
      />
      <ChevronDownIcon aria-hidden='true' />
    </span>
  </button>
)

export default CarSelectionTrigger
