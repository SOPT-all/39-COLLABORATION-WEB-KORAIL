import type { ReactNode } from 'react'

import ItxCheongchunLogo from '@/pages/train-search/assets/logo-itx-cheongchun.png'
import ItxSaemaeulLogo from '@/pages/train-search/assets/logo-itx-saemaeul.png'
import KtxLogo from '@/pages/train-search/assets/logo-ktx.png'
import MugunghwaLogo from '@/pages/train-search/assets/logo-mugunghwa.png'
import TrainDetailActionButtons from '@/pages/train-search/components/train-detail-action-buttons'
import type {
  TrainDetailInfo,
  TrainFareOption,
  TrainSeatGrade,
  TrainType,
} from '@/pages/train-search/types/train-detail'
import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg'
import BottomSheet from '@/shared/components/bottom-sheet'
import TrainTimeRow from '@/shared/components/train-time-row'

interface TrainDetailSheetProps {
  open: boolean
  train: TrainDetailInfo
  fareOptions: TrainFareOption[]
  selectedSeatGrade: TrainSeatGrade
  passengerSummary: string
  isReservationDisabled?: boolean
  onClose: () => void
  onStopDetailClick: () => void
  onSeatGradeChange: (seatGrade: TrainSeatGrade) => void
  onReservationClick: () => void
  onSeatSelectClick: () => void
}

interface TrainDetailHeaderProps {
  train: TrainDetailInfo
  closeButton: ReactNode
}

interface TrainLogo {
  alt: string
  src: string
  width: number
}

interface TrainFareTabsProps {
  fareOptions: TrainFareOption[]
  selectedSeatGrade: TrainSeatGrade
  passengerSummary: string
  onSeatGradeChange: (seatGrade: TrainSeatGrade) => void
}

interface TrainTotalPriceProps {
  price: number
}

const trainLogos: Record<TrainType, TrainLogo> = {
  'itx-cheongchun': {
    alt: 'ITX 청춘',
    src: ItxCheongchunLogo,
    width: 37,
  },
  'itx-saemaeul': {
    alt: 'ITX 새마을',
    src: ItxSaemaeulLogo,
    width: 49,
  },
  ktx: {
    alt: 'KTX',
    src: KtxLogo,
    width: 36,
  },
  mugunghwa: {
    alt: '무궁화',
    src: MugunghwaLogo,
    width: 35,
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
            className='h-3 w-auto shrink-0'
            height={12}
            src={trainLogo.src}
            width={trainLogo.width}
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

const TrainFareTabs = ({
  fareOptions,
  selectedSeatGrade,
  passengerSummary,
  onSeatGradeChange,
}: TrainFareTabsProps) => {
  return (
    <section aria-label='운임 요금' className='flex w-full flex-col gap-2'>
      <div className='flex w-full items-center justify-between overflow-hidden whitespace-nowrap'>
        <h2 className='text-heading-16-b text-gray-900'>운임 요금</h2>
        <p className='min-w-0 truncate text-body-14-r text-gray-500'>{passengerSummary}</p>
      </div>

      <div
        role='tablist'
        aria-label='좌석 등급'
        className='flex w-full gap-0.5 overflow-hidden rounded-8 bg-slate-50 p-1'
      >
        {fareOptions.map(({ seatGrade, label }) => {
          const isSelected = selectedSeatGrade === seatGrade

          return (
            <button
              key={seatGrade}
              type='button'
              role='tab'
              aria-selected={isSelected}
              className={`h-10 min-w-0 flex-1 rounded-8 px-3 py-1 text-center ${
                isSelected
                  ? 'bg-gray-0 text-body-14-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]'
                  : 'text-body-14-m text-gray-500'
              }`}
              onClick={() => onSeatGradeChange(seatGrade)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

const priceFormatter = new Intl.NumberFormat('ko-KR')

const TrainTotalPrice = ({ price }: TrainTotalPriceProps) => {
  return (
    <div className='flex w-full items-center justify-between overflow-hidden border-t border-slate-200 py-2 whitespace-nowrap'>
      <span className='text-body-14-m text-gray-700'>총 결제 금액</span>
      <strong className='text-title-22-b text-blue-500'>{priceFormatter.format(price)}원</strong>
    </div>
  )
}

const TrainDetailSheet = ({
  open,
  train,
  fareOptions,
  selectedSeatGrade,
  passengerSummary,
  isReservationDisabled = false,
  onClose,
  onStopDetailClick,
  onSeatGradeChange,
  onReservationClick,
  onSeatSelectClick,
}: TrainDetailSheetProps) => {
  const { departureTime, departureStation, arrivalTime, arrivalStation, duration, stopStation } =
    train
  const selectedFare = fareOptions.find(({ seatGrade }) => seatGrade === selectedSeatGrade)
  const totalPrice = selectedFare?.price ?? 0

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title='열차 상세'
      renderHeader={(closeButton) => <TrainDetailHeader train={train} closeButton={closeButton} />}
      footer={
        <div className='flex w-full flex-col'>
          <TrainTotalPrice price={totalPrice} />
          <TrainDetailActionButtons
            isReservationDisabled={isReservationDisabled}
            reservationLabel='바로 예매하기'
            onReservationClick={onReservationClick}
            onSeatSelectClick={onSeatSelectClick}
          />
        </div>
      }
    >
      <div className='flex w-full flex-col gap-4'>
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

        <TrainFareTabs
          fareOptions={fareOptions}
          selectedSeatGrade={selectedSeatGrade}
          passengerSummary={passengerSummary}
          onSeatGradeChange={onSeatGradeChange}
        />
      </div>
    </BottomSheet>
  )
}

export default TrainDetailSheet
