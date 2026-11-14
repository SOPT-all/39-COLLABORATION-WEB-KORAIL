import ChevronRightIcon from '@/shared/icons/chevron-right.svg?react'

import Button from '@/shared/components/button'

interface SeatSelectionCtaProps {
  onPreviewClick?: () => void
  onSeatSelectClick?: () => void
  selectedSeatCount?: number
  totalSeatCount?: number
}

const SeatSelectionCta = ({
  onPreviewClick,
  onSeatSelectClick,
  selectedSeatCount = 0,
  totalSeatCount = 1,
}: SeatSelectionCtaProps) => {
  const isSeatSelectionDisabled = selectedSeatCount === 0

  return (
    <section
      aria-label='좌석 선택 현황'
      className='flex w-[375px] flex-col overflow-hidden border-t border-slate-200 bg-gray-0 p-4'
    >
      <div className='flex w-full flex-col gap-[18px]'>
        <header className='flex h-6 w-full items-center justify-between'>
          <p className='flex h-6 items-center gap-0.5 text-heading-16-b'>
            <span className={isSeatSelectionDisabled ? 'text-gray-300' : 'text-blue-500'}>
              {selectedSeatCount}
            </span>
            <span className='text-gray-900'>/ {totalSeatCount}석 선택</span>
          </p>

          <button
            className='flex h-6 items-center text-body-14-m text-blue-400'
            onClick={onPreviewClick}
            type='button'
          >
            열차 내 미리 보기(VR)
            <ChevronRightIcon />
          </button>
        </header>

        <Button disabled={isSeatSelectionDisabled} width={343} onClick={onSeatSelectClick}>
          좌석 선택하기
        </Button>
      </div>
    </section>
  )
}

export default SeatSelectionCta
