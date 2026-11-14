import Button from '@/shared/components/button'

interface TrainDetailActionButtonsProps {
  isReservationDisabled?: boolean
  onReservationClick?: () => void
  onSeatSelectClick?: () => void
}

const TrainDetailActionButtons = ({
  isReservationDisabled = false,
  onReservationClick,
  onSeatSelectClick,
}: TrainDetailActionButtonsProps) => {
  return (
    <div className='flex w-[343px] items-center justify-center gap-[7px]'>
      <Button variant='outline' width={129} onClick={onSeatSelectClick}>
        좌석 선택
      </Button>
      <Button disabled={isReservationDisabled} width={207} onClick={onReservationClick}>
        예매하기
      </Button>
    </div>
  )
}

export default TrainDetailActionButtons
