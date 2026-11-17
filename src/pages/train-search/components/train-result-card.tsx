import type { TrainResult, TrainType } from '@/pages/train-search/types/train-result'
import ItxCheongchunLogo from '@/pages/train-search/assets/logo-card-itx-cheongchun.png'
import ItxSaemaeulLogo from '@/pages/train-search/assets/logo-card-itx-saemaeul.png'
import KtxLogo from '@/pages/train-search/assets/logo-card-ktx.png'
import MugunghwaLogo from '@/pages/train-search/assets/logo-card-mugunghwa.png'
import TrainTimeRow from '@/shared/components/train-time-row'

interface TrainResultCardProps {
  train: TrainResult
  onSelect?: () => void
}

interface FareInfoProps {
  fare: number
  rewardRate: number
  seatLabel: string
}

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

const formatFare = (fare: number) => `${fare.toLocaleString('ko-KR')}원`

const FareInfo = ({ fare, rewardRate, seatLabel }: FareInfoProps) => {
  return (
    <div className='flex min-w-0 flex-1 flex-col items-center justify-center rounded-8 bg-slate-50 px-3 py-2'>
      <div className='flex w-full flex-col items-start gap-1'>
        <span className='w-full text-label-12-r text-gray-600'>{seatLabel}</span>
        <div className='flex w-full items-center justify-between'>
          <span className='shrink-0 text-body-14-b whitespace-nowrap text-gray-900'>
            {formatFare(fare)}
          </span>
          <span className='shrink-0 text-right text-caption-10-r whitespace-nowrap text-green-450'>
            {rewardRate}%적립
          </span>
        </div>
      </div>
    </div>
  )
}

const TrainResultCard = ({ train, onSelect }: TrainResultCardProps) => {
  const {
    arrivalStation,
    arrivalTime,
    departureStation,
    departureTime,
    duration,
    firstClassFare,
    rewardRate,
    standardFare,
    stopStation,
    trainNumber,
    trainType,
  } = train
  const { borderClassName, label, logo, logoWidth } = trainAppearance[trainType]
  const cardClassName = `flex w-full flex-col items-start gap-3 rounded-12 border-l-4 border-solid bg-gray-0 py-2 pr-2 pl-3 shadow-[0_0_2px_rgba(0,0,0,0.08)] ${borderClassName}`

  const cardContent = (
    <>
      <div className='flex w-full flex-col items-start gap-2'>
        <div className='flex h-[18px] w-full items-center gap-2'>
          <img alt='' className='block shrink-0' height={12} src={logo} width={logoWidth} />
          <span className='shrink-0 rounded-full bg-slate-50 px-2.5 py-0.5 text-caption-10-m whitespace-nowrap text-gray-600'>
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

      <div className='flex w-full items-center gap-[9px] pt-2'>
        <FareInfo fare={standardFare} rewardRate={rewardRate} seatLabel='일반실' />
        <FareInfo fare={firstClassFare} rewardRate={rewardRate} seatLabel='특실' />
      </div>
    </>
  )

  if (onSelect) {
    return (
      <button
        type='button'
        aria-label={`${label} ${trainNumber} 열차 선택`}
        className={`${cardClassName} text-left active:bg-slate-50`}
        onClick={onSelect}
      >
        {cardContent}
      </button>
    )
  }

  return (
    <article aria-label={`${label} ${trainNumber} 열차`} className={cardClassName}>
      {cardContent}
    </article>
  )
}

export default TrainResultCard
