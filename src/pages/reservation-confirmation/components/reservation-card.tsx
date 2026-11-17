import ItxCheongchunLogo from '@/pages/train-search/assets/logo-itx-cheongchun.png'
import ItxSaemaeulLogo from '@/pages/train-search/assets/logo-itx-saemaeul.png'
import KtxLogo from '@/pages/train-search/assets/logo-ktx.png'
import MugunghwaLogo from '@/pages/train-search/assets/logo-mugunghwa.png'
import Button from '@/shared/components/button'
import TrainTimeRow from '@/shared/components/train-time-row'

type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

interface TrainAppearance {
  label: string
  logo: string
  logoWidth: number
  borderClassName: string
}

const trainAppearance: Record<TrainType, TrainAppearance> = {
  ktx: {
    label: 'KTX',
    logo: KtxLogo,
    logoWidth: 36,
    borderClassName: 'border-blue-500',
  },
  'itx-cheongchun': {
    label: 'ITX-청춘',
    logo: ItxCheongchunLogo,
    logoWidth: 37,
    borderClassName: 'border-gray-900',
  },
  'itx-saemaeul': {
    label: 'ITX-새마을',
    logo: ItxSaemaeulLogo,
    logoWidth: 49,
    borderClassName: 'border-red-450',
  },
  mugunghwa: {
    label: '무궁화',
    logo: MugunghwaLogo,
    logoWidth: 35,
    borderClassName: 'border-green-450',
  },
}

interface ReservationCardProps {
  trainType: TrainType
  trainNumber: string
  departureTime: string
  departureStation: string
  arrivalTime: string
  arrivalStation: string
  duration: string
  stopStation?: string
  seat: string
  paymentDeadline: string
}

const ReservationCard = ({
  trainType,
  trainNumber,
  departureTime,
  departureStation,
  arrivalTime,
  arrivalStation,
  duration,
  stopStation,
  seat,
  paymentDeadline,
}: ReservationCardProps) => {
  const { label, logo, logoWidth, borderClassName } = trainAppearance[trainType]

  return (
    <article
      aria-label={`${label} ${trainNumber} 열차 예약`}
      className={`flex w-full flex-col gap-3 rounded-12 border-l-4 bg-gray-0 py-2 pr-2 pl-3 shadow-[0_0_2px_rgba(0,0,0,0.08)] ${borderClassName}`}
    >
      <div className='flex w-full flex-col gap-2'>
        <div className='flex h-[18px] items-center gap-2'>
          <img alt={label} className='block shrink-0' height={12} src={logo} width={logoWidth} />
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
          stopStationWeight='regular'
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
        <Button disabled className='min-w-0 flex-1 disabled:cursor-default!' variant='secondary'>
          예약취소
        </Button>
        <Button disabled className='min-w-0 flex-1 disabled:cursor-default!' variant='secondary'>
          장바구니
        </Button>
      </div>
    </article>
  )
}

export default ReservationCard
