import CloseIcon from '@/pages/train-search/assets/icon-close.svg'
import TrainDetailActionButtons from '@/pages/train-search/components/train-detail-action-buttons'
import TrainLogo from '@/pages/train-search/components/train-logo'
import type { TrainDetailInfo, TrainFareOption } from '@/pages/train-search/types/train-detail'
import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg?react'
import BottomSheet from '@/shared/components/bottom-sheet'
import TrainTimeRow from '@/shared/components/train-time-row'

interface TrainDetailSheetProps {
  open: boolean
  train: TrainDetailInfo
  fareOption: TrainFareOption
  passengerSummary: string
  isPending?: boolean
  isError?: boolean
  isReservationDisabled?: boolean
  isReservationPending?: boolean
  reservationError?: string
  onClose: () => void
  onReservationClick: () => void
  onSeatSelectClick: () => void
}

interface TrainDetailHeaderProps {
  train: TrainDetailInfo
  onClose: () => void
}

interface TrainFareInfoProps {
  passengerSummary: string
}

interface TrainTotalPriceProps {
  price: number
}

const TrainDetailHeader = ({ train, onClose }: TrainDetailHeaderProps) => {
  const { trainType, trainNumber, departureDate, departureStation, arrivalStation } = train

  return (
    <div className='flex items-start justify-between gap-4 px-4 pt-5 pb-4'>
      <div className='flex min-w-0 flex-col items-start gap-1 overflow-hidden'>
        <div className='flex w-full items-center gap-2'>
          <TrainLogo trainType={trainType} />
          <span className='shrink-0 rounded-full bg-slate-50 px-2.5 py-0.5 text-caption-10-m text-gray-600'>
            {trainNumber}
          </span>
        </div>

        <p className='max-w-full text-subtitle-20-b whitespace-nowrap text-gray-900'>
          {departureDate} · {departureStation} → {arrivalStation}
        </p>
      </div>

      <div className='relative h-6 w-[34px] shrink-0'>
        <button
          type='button'
          aria-label='닫기'
          className='absolute top-1/2 right-0 flex size-11 -translate-y-1/2 items-center justify-end'
          onClick={onClose}
        >
          <img alt='' aria-hidden='true' src={CloseIcon} />
        </button>
      </div>
    </div>
  )
}

const TrainFareInfo = ({ passengerSummary }: TrainFareInfoProps) => (
  <section aria-label='운임 요금' className='flex w-full flex-col gap-2'>
    <div className='flex w-full items-center justify-between overflow-hidden whitespace-nowrap'>
      <h2 className='text-heading-16-b text-gray-900'>운임 요금</h2>
      <p className='min-w-0 truncate text-body-14-r text-gray-500'>{passengerSummary}</p>
    </div>

    <div
      role='group'
      aria-label='좌석 등급: 일반실'
      className='flex w-full gap-0.5 rounded-8 bg-slate-50 p-1'
    >
      <span className='flex h-10 min-w-0 flex-1 items-center justify-center rounded-8 bg-gray-0 px-3 py-1 text-center text-body-14-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]'>
        일반실
      </span>
      <span className='flex h-10 min-w-0 flex-1 items-center justify-center rounded-8 px-3 py-1 text-center text-body-14-m text-gray-500'>
        특실
      </span>
    </div>
  </section>
)

const priceFormatter = new Intl.NumberFormat('ko-KR')

const TrainTotalPrice = ({ price }: TrainTotalPriceProps) => (
  <div className='flex w-full items-center justify-between overflow-hidden border-t border-slate-200 py-2 whitespace-nowrap'>
    <span className='text-body-14-m text-gray-700'>총 결제 금액</span>
    <strong className='text-title-22-b text-blue-500'>{priceFormatter.format(price)}원</strong>
  </div>
)

const TrainDetailSheet = ({
  open,
  train,
  fareOption,
  passengerSummary,
  isPending = false,
  isError = false,
  isReservationDisabled = false,
  isReservationPending = false,
  reservationError = '',
  onClose,
  onReservationClick,
  onSeatSelectClick,
}: TrainDetailSheetProps) => {
  const { departureTime, departureStation, arrivalTime, arrivalStation, duration, stopStation } =
    train

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title='열차 상세'
      renderHeader={() => <TrainDetailHeader train={train} onClose={onClose} />}
      footer={
        !isPending && !isError ? (
          <div className='flex w-full flex-col'>
            {reservationError && (
              <p className='pb-3 text-body-14-r text-red-450' role='alert'>
                {reservationError}
              </p>
            )}

            <TrainTotalPrice price={fareOption.price} />

            {isReservationPending ? (
              <p className='py-3 text-center text-body-14-m text-gray-600' role='status'>
                좌석을 자동 배정하고 예약하는 중입니다.
              </p>
            ) : (
              <TrainDetailActionButtons
                isReservationDisabled={isReservationDisabled}
                reservationLabel='바로 예매하기'
                onReservationClick={onReservationClick}
                onSeatSelectClick={onSeatSelectClick}
              />
            )}
          </div>
        ) : undefined
      }
    >
      {isPending && (
        <p className='py-16 text-center text-body-14-r text-gray-600' role='status'>
          열차 상세 정보를 불러오는 중입니다.
        </p>
      )}

      {isError && (
        <p className='py-16 text-center text-body-14-r text-gray-600' role='alert'>
          열차 상세 정보를 불러오지 못했습니다.
        </p>
      )}

      {!isPending && !isError && (
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

            <div className='flex h-[42px] w-full items-center justify-between border-t border-slate-100 text-left text-body-14-r text-gray-700'>
              <span>정차역 · 소요시간 상세</span>
              <span className='flex h-full w-11 shrink-0 items-center justify-end'>
                <ChevronRightIcon aria-hidden='true' className='[&_path]:stroke-gray-700' />
              </span>
            </div>
          </section>

          <TrainFareInfo passengerSummary={passengerSummary} />
        </div>
      )}
    </BottomSheet>
  )
}

export default TrainDetailSheet
