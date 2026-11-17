import KtxLogo from '@/shared/assets/logo-card-ktx.png'
import Button from '@/shared/components/button'
import TrainTimeRow from '@/shared/components/train-time-row'

interface ReservationCardProps {
  trainNumber: string
  departureTime: string
  departureStation: string
  arrivalTime: string
  arrivalStation: string
  duration: string
  stopStation?: string
  seat: string
  paymentDeadline: string
  onCancelClick?: () => void
  onCartClick?: () => void
}

const ReservationCard = ({
  trainNumber,
  departureTime,
  departureStation,
  arrivalTime,
  arrivalStation,
  duration,
  stopStation,
  seat,
  paymentDeadline,
  onCancelClick,
  onCartClick,
}: ReservationCardProps) => {
  return (
    <article
      aria-label={`KTX ${trainNumber} 열차 예약`}
      className='flex w-full flex-col gap-3 rounded-12 border-l-4 border-blue-500 bg-gray-0 py-2 pr-2 pl-3 shadow-[0_0_2px_rgba(0,0,0,0.08)]'
    >
      <div className='flex w-full flex-col gap-2'>
        <div className='flex h-[18px] items-center gap-2'>
          <img alt='KTX' className='block shrink-0' height={12} src={KtxLogo} width={36} />
          <span className='shrink-0 rounded-full bg-slate-50 px-2.5 py-0.5 text-caption-10-m text-gray-600'>
            {trainNumber}
          </span>
        </div>
        <TrainTimeRow
          arrivalStation={arrivalStation}
          arrivalTime={arrivalTime}
          departureStation={departureStation}
          departureTime={departureTime}
          duration={duration}
          stopStation={stopStation}
        />
      </div>

      <dl className='flex h-15 w-full flex-col justify-center gap-2 rounded-8 border border-slate-100 px-3'>
        <div className='flex items-center justify-between gap-2'>
          <dt className='text-label-12-r text-slate-600'>좌석</dt>
          <dd className='text-label-12-m text-gray-900'>{seat}</dd>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <dt className='text-label-12-r text-slate-600'>결제기한</dt>
          <dd className='text-label-12-b text-red-450'>{paymentDeadline}</dd>
        </div>
      </dl>

      <div className='flex w-full gap-2'>
        <Button className='min-w-0 flex-1' variant='secondary' onClick={onCancelClick}>
          예약취소
        </Button>
        <Button className='min-w-0 flex-1' variant='secondary' onClick={onCartClick}>
          장바구니
        </Button>
      </div>
    </article>
  )
}

export default ReservationCard
