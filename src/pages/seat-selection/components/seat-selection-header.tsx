import CloseIcon from '@/shared/assets/icon-close.svg?react'

interface SeatSelectionHeaderProps {
  trainLabel: string
  departureDateTime: string
  departureStation: string
  arrivalStation: string
  onClose: () => void
}

const SeatSelectionHeader = ({
  trainLabel,
  departureDateTime,
  departureStation,
  arrivalStation,
  onClose,
}: SeatSelectionHeaderProps) => (
  <header className='sticky top-0 z-10 bg-gray-0 text-gray-900'>
    <div className='flex min-h-[60px] items-center justify-between gap-2 pt-0.5 pr-1.5 pl-5'>
      <h2 className='text-heading-16-b'>좌석선택({trainLabel})</h2>

      <button
        type='button'
        aria-label='좌석 선택 닫기'
        onClick={onClose}
        className='grid size-11 shrink-0 place-items-center rounded-8 focus-visible:outline-2 focus-visible:outline-blue-700'
      >
        <CloseIcon aria-hidden='true' />
      </button>
    </div>

    <div className='flex flex-col items-center gap-2 px-5 pt-5 pb-4 text-center'>
      <p className='text-body-14-r text-gray-400'>{departureDateTime}</p>
      <p className='flex flex-wrap justify-center gap-x-1 text-subtitle-20-b'>
        <span>{departureStation}</span>
        <span>→</span>
        <span>{arrivalStation}</span>
      </p>
    </div>
  </header>
)

export default SeatSelectionHeader
