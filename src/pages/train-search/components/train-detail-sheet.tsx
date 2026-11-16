import type { ReactNode } from 'react'

import type { TrainDetailInfo, TrainType } from '@/pages/train-search/types/train-detail'
import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg'
import ItxCheongchunLogo from '@/shared/assets/logo-itx-cheongchun.png'
import ItxSaemaeulLogo from '@/shared/assets/logo-itx-saemaeul.png'
import KtxLogo from '@/shared/assets/logo-ktx.png'
import MugunghwaLogo from '@/shared/assets/logo-mugunghwa.png'
import BottomSheet from '@/shared/components/bottom-sheet'
import TrainTimeRow from '@/shared/components/train-time-row'

interface TrainDetailSheetProps {
  open: boolean
  train: TrainDetailInfo
  onClose: () => void
  onStopDetailClick: () => void
}

interface TrainDetailHeaderProps {
  train: TrainDetailInfo
  closeButton: ReactNode
}

interface TrainLogo {
  alt: string
  src: string
}

const trainLogos: Record<TrainType, TrainLogo> = {
  'itx-cheongchun': {
    alt: 'ITX 청춘',
    src: ItxCheongchunLogo,
  },
  'itx-saemaeul': {
    alt: 'ITX 새마을',
    src: ItxSaemaeulLogo,
  },
  ktx: {
    alt: 'KTX',
    src: KtxLogo,
  },
  mugunghwa: {
    alt: '무궁화',
    src: MugunghwaLogo,
  },
}

const TrainDetailHeader = ({ train, closeButton }: TrainDetailHeaderProps) => {
  const { trainType, trainNumber, departureDate, departureStation, arrivalStation } = train
  const trainLogo = trainLogos[trainType]

  return (
    <div className='flex items-start justify-between gap-4 px-4 pt-5 pb-4'>
      <div className='flex min-w-0 flex-col items-start gap-1 overflow-hidden'>
        <div className='flex w-full items-center gap-2'>
          <img
            alt={trainLogo.alt}
            className='h-3 w-[49px] shrink-0 object-contain object-left'
            height={12}
            src={trainLogo.src}
            width={49}
          />
          <span className='shrink-0 rounded-full bg-slate-50 px-2.5 py-0.5 text-caption-10-m text-gray-600'>
            {trainNumber}
          </span>
        </div>

        <p className='max-w-full truncate text-subtitle-20-b text-gray-900'>
          {departureDate} · {departureStation} → {arrivalStation}
        </p>
      </div>
      {closeButton}
    </div>
  )
}

const TrainDetailSheet = ({ open, train, onClose, onStopDetailClick }: TrainDetailSheetProps) => {
  const { departureTime, departureStation, arrivalTime, arrivalStation, duration, stopStation } =
    train

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title='열차 상세'
      renderHeader={(closeButton) => <TrainDetailHeader train={train} closeButton={closeButton} />}
    >
      <section aria-label='열차 운행 정보' className='rounded-8 bg-slate-50 px-4 py-1'>
        <div className='py-3'>
          <TrainTimeRow
            departureTime={departureTime}
            departureStation={departureStation}
            arrivalTime={arrivalTime}
            arrivalStation={arrivalStation}
            duration={duration}
            stopStation={stopStation}
          />
        </div>

        <button
          type='button'
          className='flex h-[42px] w-full items-center justify-between border-t border-slate-100 text-left text-body-14-r text-gray-700'
          onClick={onStopDetailClick}
        >
          <span>정차역 · 소요시간 상세</span>
          <span className='flex h-full w-11 shrink-0 items-center justify-end'>
            <img alt='' aria-hidden='true' height={24} src={ChevronRightIcon} width={24} />
          </span>
        </button>
      </section>
    </BottomSheet>
  )
}

export default TrainDetailSheet
