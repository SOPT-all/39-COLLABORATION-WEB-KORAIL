import Button from '@/shared/components/button'

interface TrainDetailActionButtonsProps {
  isReservationDisabled?: boolean
  reservationLabel?: string
  onReservationClick?: () => void
  onSeatSelectClick?: () => void
}

const TrainDetailActionButtons = ({
  isReservationDisabled = false,
  reservationLabel = '예매하기',
  onReservationClick,
  onSeatSelectClick,
}: TrainDetailActionButtonsProps) => {
  return (
    <div className='grid w-full max-w-[343px] grid-cols-[minmax(0,129fr)_minmax(0,207fr)] items-center gap-[7px]'>
      <Button
        className='max-w-full whitespace-nowrap max-[374px]:px-3'
        variant='outline'
        width={129}
        onClick={onSeatSelectClick}
      >
        좌석 선택
      </Button>
      <Button
        className='max-w-full whitespace-nowrap'
        disabled={isReservationDisabled}
        width={207}
        onClick={onReservationClick}
      >
        {reservationLabel}
      </Button>
    </div>
  )
}

export default TrainDetailActionButtons
