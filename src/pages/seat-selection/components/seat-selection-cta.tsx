import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg?react'
import Button from '@/shared/components/button'

interface SeatSelectionCtaProps {
  onSeatSelectClick: () => void
  selectedSeatCount?: 0 | 1
}

const SeatSelectionCta = ({ onSeatSelectClick, selectedSeatCount = 0 }: SeatSelectionCtaProps) => {
  const hasSelectedSeat = selectedSeatCount === 1

  return (
    <section
      aria-label='좌석 선택 현황'
      className='flex w-full max-w-[375px] flex-col gap-[18px] bg-gray-0 p-4 shadow-[0_-2px_2px_rgba(0,0,0,0.08)]'
    >
      <header className='flex h-6 items-center justify-between'>
        <p className='flex items-center gap-0.5 text-heading-16-b text-gray-900'>
          <span className={hasSelectedSeat ? 'text-blue-500' : 'text-gray-300'}>
            {selectedSeatCount}
          </span>
          <span>/</span>
          <span>1석 선택</span>
        </p>
        <span className='flex h-6 items-center text-body-14-m text-blue-400'>
          열차 내 미리 보기(VR)
          <ChevronRightIcon
            aria-hidden='true'
            className='size-6 shrink-0 [&_path]:stroke-current'
          />
        </span>
      </header>

      <Button
        className='max-w-full'
        disabled={!hasSelectedSeat}
        onClick={onSeatSelectClick}
        width={343}
      >
        좌석 선택완료
      </Button>
    </section>
  )
}

export default SeatSelectionCta
