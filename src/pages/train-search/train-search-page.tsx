import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { getScheduleDetail } from '@/pages/train-search/api/get-schedule-detail'
import { getSchedules } from '@/pages/train-search/api/get-schedules'
import NextDaySearchButton from '@/pages/train-search/components/next-day-search-button'
import TrainDetailSheet from '@/pages/train-search/components/train-detail-sheet'
import TrainResultList from '@/pages/train-search/components/train-result-list'
import TrainSearchForm from '@/pages/train-search/components/train-search-form'
import TrainTypeFilter, {
  type TrainType as TrainFilterType,
} from '@/pages/train-search/components/train-type-filter'
import type { TrainDetailInfo, TrainFareOption } from '@/pages/train-search/types/train-detail'
import type { TrainResult } from '@/pages/train-search/types/train-result'
import type {
  ScheduleDetailResponse,
  ScheduleResponse,
  ScheduleTrainType,
} from '@/pages/train-search/types/schedule'
import type {
  TrainSearchCondition,
  TripType,
} from '@/pages/train-search/types/train-search-condition'

const formatRequestDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const formatDateLabel = (date: Date) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${month}.${day} (${weekdays[date.getDay()]})`
}

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)

  return nextDate
}

const initialDepartureDate = new Date()

const initialSearchCondition: TrainSearchCondition = {
  tripType: 'round-trip',
  dateLabel: formatDateLabel(initialDepartureDate),
  timeLabel: `${String(initialDepartureDate.getHours()).padStart(2, '0')}:${String(
    initialDepartureDate.getMinutes(),
  ).padStart(2, '0')} 이후`,
  departureStation: '서울',
  arrivalStation: '부산',
  seatGradeLabel: '전체',
  passengerLabel: '어른 1명',
  isSeoulAreaIncluded: false,
  isAdjacentStationIncluded: false,
}

const scheduleTrainTypeByFilter: Partial<Record<TrainFilterType, ScheduleTrainType>> = {
  ktx: 'KTX',
  'itx-saemaeul': 'ITX',
  'itx-cheongchun': 'ITX_CHEONGCHUN',
  mugunghwa: 'MUGUNGHWA',
}

const trainTypeBySchedule: Record<ScheduleTrainType, TrainResult['trainType']> = {
  KTX: 'ktx',
  ITX: 'itx-saemaeul',
  ITX_CHEONGCHUN: 'itx-cheongchun',
  MUGUNGHWA: 'mugunghwa',
}

const formatTime = (dateTime: string) => dateTime.slice(11, 16)

const formatDuration = (durationMinutes: number) => {
  const hours = Math.floor(durationMinutes / 60)
  const minutes = durationMinutes % 60

  if (hours === 0) return `${minutes}분`
  if (minutes === 0) return `${hours}시간`

  return `${hours}시간 ${minutes}분`
}

const getFare = (schedule: ScheduleResponse, seatClass: 'STANDARD' | 'FIRST') => {
  return schedule.fares.find((fare) => fare.seatClass === seatClass)?.totalPrice
}

const getPassengerCount = (passengerLabel: string) => {
  const passengerCount = Number(passengerLabel.match(/\d+/)?.[0])

  return Number.isInteger(passengerCount) && passengerCount > 0 ? passengerCount : 1
}

const getTrainResult = (
  schedule: ScheduleResponse,
  departureStation: string,
  arrivalStation: string,
): TrainResult => {
  const standardFare = getFare(schedule, 'STANDARD') ?? 0

  return {
    id: String(schedule.scheduleId),
    trainType: trainTypeBySchedule[schedule.trainType],
    trainNumber: schedule.trainNumber,
    departureTime: formatTime(schedule.departureAt),
    departureStation,
    arrivalTime: formatTime(schedule.arrivalAt),
    arrivalStation,
    duration: formatDuration(schedule.durationMinutes),
    stopStation: schedule.remark ?? undefined,
    standardFare,
    firstClassFare: getFare(schedule, 'FIRST') ?? standardFare,
    rewardRate: 5,
  }
}

const getTrainDetail = (train: TrainResult, departureDate: string): TrainDetailInfo => ({
  trainType: train.trainType,
  trainNumber: train.trainNumber,
  departureDate,
  departureTime: train.departureTime,
  departureStation: train.departureStation,
  arrivalTime: train.arrivalTime,
  arrivalStation: train.arrivalStation,
  duration: train.duration,
  stopStation: train.stopStation,
})

const getScheduleTrainDetail = (
  schedule: ScheduleDetailResponse,
  departureStation: string,
  arrivalStation: string,
): TrainDetailInfo => ({
  trainType: trainTypeBySchedule[schedule.trainType],
  trainNumber: schedule.trainNumber,
  departureDate: formatDateLabel(new Date(schedule.departureAt)),
  departureTime: formatTime(schedule.departureAt),
  departureStation,
  arrivalTime: formatTime(schedule.arrivalAt),
  arrivalStation,
  duration: formatDuration(schedule.durationMinutes),
  stopStation: schedule.remark ?? undefined,
})

const getStandardFare = (train: TrainResult): TrainFareOption => ({
  seatGrade: 'standard',
  label: '일반실',
  price: train.standardFare,
})

const TrainSearchPage = () => {
  const navigate = useNavigate()
  const [searchCondition, setSearchCondition] =
    useState<TrainSearchCondition>(initialSearchCondition)
  const [submittedCondition, setSubmittedCondition] =
    useState<TrainSearchCondition>(initialSearchCondition)
  const [departureDate, setDepartureDate] = useState(initialDepartureDate)
  const [submittedDepartureDate, setSubmittedDepartureDate] = useState(initialDepartureDate)
  const [selectedTrainType, setSelectedTrainType] = useState<TrainFilterType>('all')
  const [selectedTrain, setSelectedTrain] = useState<TrainResult | null>(null)

  const scheduleTrainType = scheduleTrainTypeByFilter[selectedTrainType]
  const passengerCount = getPassengerCount(submittedCondition.passengerLabel)
  const {
    data: scheduleList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [
      'schedules',
      submittedCondition.departureStation,
      submittedCondition.arrivalStation,
      formatRequestDate(submittedDepartureDate),
      scheduleTrainType,
    ],
    queryFn: () =>
      getSchedules({
        departureStation: submittedCondition.departureStation,
        arrivalStation: submittedCondition.arrivalStation,
        departureDate: formatRequestDate(submittedDepartureDate),
        passengerCount,
        trainTypes: scheduleTrainType ? [scheduleTrainType] : undefined,
      }),
  })

  const trainResults =
    scheduleList?.schedules.map((schedule) =>
      getTrainResult(
        schedule,
        submittedCondition.departureStation,
        submittedCondition.arrivalStation,
      ),
    ) ?? []

  const selectedScheduleId = selectedTrain ? Number(selectedTrain.id) : null
  const {
    data: scheduleDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useQuery({
    queryKey: ['schedule-detail', selectedScheduleId, passengerCount],
    queryFn: () => {
      if (selectedScheduleId === null) {
        throw new Error('선택한 열차 일정이 없습니다.')
      }

      return getScheduleDetail(selectedScheduleId, passengerCount)
    },
    enabled: selectedScheduleId !== null,
  })

  const handleSearchSubmit = () => {
    setSubmittedCondition(searchCondition)
    setSubmittedDepartureDate(departureDate)
    setSelectedTrainType('all')
    setSelectedTrain(null)
  }

  const handleTripTypeChange = (tripType: TripType) => {
    setSearchCondition((condition) => ({ ...condition, tripType }))
    setSelectedTrain(null)
  }

  const handleStationSwap = () => {
    setSearchCondition((condition) => ({
      ...condition,
      departureStation: condition.arrivalStation,
      arrivalStation: condition.departureStation,
    }))
    setSelectedTrain(null)
  }

  const handleSeoulAreaChange = (checked: boolean) => {
    setSearchCondition((condition) => ({
      ...condition,
      isSeoulAreaIncluded: checked,
    }))
  }

  const handleAdjacentStationChange = (checked: boolean) => {
    setSearchCondition((condition) => ({
      ...condition,
      isAdjacentStationIncluded: checked,
    }))
  }

  const handleTrainTypeChange = (trainType: TrainFilterType) => {
    setSelectedTrainType(trainType)
    setSelectedTrain(null)
  }

  const handleNextDaySearch = () => {
    const nextDepartureDate = addDays(submittedDepartureDate, 1)
    const nextSearchCondition = {
      ...submittedCondition,
      dateLabel: formatDateLabel(nextDepartureDate),
      timeLabel: '00:00 이후',
    }

    setDepartureDate(nextDepartureDate)
    setSubmittedDepartureDate(nextDepartureDate)
    setSearchCondition(nextSearchCondition)
    setSubmittedCondition(nextSearchCondition)
    setSelectedTrainType('all')
    setSelectedTrain(null)
  }

  const handleSeatSelect = () => {
    if (!selectedTrain) return

    navigate(`/seat-selection/${selectedTrain.id}`)
  }

  const handleReservation = () => {
    navigate('/reservation-confirmation')
  }

  const nextDateLabel = formatDateLabel(addDays(departureDate, 1))

  return (
    <main className='min-h-[calc(100dvh-60px)] bg-slate-50 px-4'>
      <h1 className='sr-only'>열차 조회</h1>

      <div className='mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-[343px] flex-col'>
        <div className='flex flex-col gap-4 pb-6'>
          <TrainSearchForm
            condition={searchCondition}
            onSubmit={handleSearchSubmit}
            onTripTypeChange={handleTripTypeChange}
            onStationSwap={handleStationSwap}
            onSeoulAreaChange={handleSeoulAreaChange}
            onAdjacentStationChange={handleAdjacentStationChange}
          />

          <TrainTypeFilter
            selectedTrainType={selectedTrainType}
            onTrainTypeChange={handleTrainTypeChange}
          />

          {isPending && (
            <p className='pt-18 text-center text-body-14-r text-gray-600' role='status'>
              열차 정보를 불러오는 중입니다.
            </p>
          )}

          {isError && (
            <p className='pt-18 text-center text-body-14-r text-gray-600' role='alert'>
              열차 정보를 불러오지 못했습니다.
            </p>
          )}

          {!isPending && !isError && (
            <TrainResultList trains={trainResults} onTrainSelect={setSelectedTrain} />
          )}
        </div>

        <div className='mt-auto pt-4 pb-14'>
          <NextDaySearchButton nextDateLabel={nextDateLabel} onClick={handleNextDaySearch} />
        </div>
      </div>

      {selectedTrain && (
        <TrainDetailSheet
          open
          train={
            scheduleDetail
              ? getScheduleTrainDetail(
                  scheduleDetail,
                  submittedCondition.departureStation,
                  submittedCondition.arrivalStation,
                )
              : getTrainDetail(selectedTrain, submittedCondition.dateLabel)
          }
          fareOption={
            scheduleDetail
              ? {
                  seatGrade: 'standard',
                  label: '일반실',
                  price: getFare(scheduleDetail, 'STANDARD') ?? selectedTrain.standardFare,
                }
              : getStandardFare(selectedTrain)
          }
          passengerSummary={`어른 ${scheduleDetail?.passengerCount ?? passengerCount}명 기준`}
          isPending={isDetailPending}
          isError={isDetailError}
          onClose={() => setSelectedTrain(null)}
          onReservationClick={handleReservation}
          onSeatSelectClick={handleSeatSelect}
        />
      )}
    </main>
  )
}

export default TrainSearchPage
