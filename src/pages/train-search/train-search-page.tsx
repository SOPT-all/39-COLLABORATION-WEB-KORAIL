import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useNavigate, useSearchParams } from 'react-router'

import { createReservation } from '@/pages/seat-selection/api/create-reservation'
import { getScheduleDetail } from '@/pages/train-search/api/get-schedule-detail'
import { getSchedules } from '@/pages/train-search/api/get-schedules'
import NextDaySearchButton from '@/pages/train-search/components/next-day-search-button'
import TrainDetailSheet from '@/pages/train-search/components/train-detail-sheet'
import TrainResultList from '@/pages/train-search/components/train-result-list'
import TrainSearchForm from '@/pages/train-search/components/train-search-form'
import TrainTypeFilter, {
  type TrainType as TrainFilterType,
} from '@/pages/train-search/components/train-type-filter'
import type { TrainDetailInfo } from '@/pages/train-search/types/train-detail'
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

const passengerCount = 1

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

const getInitialSearch = (searchParams: URLSearchParams) => {
  const requestedDate = searchParams.get('departureDate')
  const parsedDate =
    requestedDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate)
      ? new Date(`${requestedDate}T00:00:00`)
      : null

  const departureDate =
    parsedDate &&
    !Number.isNaN(parsedDate.getTime()) &&
    formatRequestDate(parsedDate) === requestedDate
      ? parsedDate
      : new Date()

  const condition: TrainSearchCondition = {
    tripType: 'one-way',
    dateLabel: formatDateLabel(departureDate),
    timeLabel: '00:00 이후',
    departureStation: searchParams.get('departureStation') || '서울',
    arrivalStation: searchParams.get('arrivalStation') || '부산',
    seatGradeLabel: '전체',
    passengerLabel: `어른 ${passengerCount}명`,
    isSeoulAreaIncluded: false,
    isAdjacentStationIncluded: false,
  }

  return { departureDate, condition }
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

const getFare = (schedule: ScheduleResponse, seatClass: 'STANDARD' | 'FIRST') =>
  schedule.fares.find((fare) => fare.seatClass === seatClass)?.totalPrice

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

const createSearchParams = (condition: TrainSearchCondition, date: Date) =>
  new URLSearchParams({
    departureStation: condition.departureStation,
    arrivalStation: condition.arrivalStation,
    departureDate: formatRequestDate(date),
  })

const TrainSearchPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isReservingRef = useRef(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const [initialSearch] = useState(() => getInitialSearch(searchParams))

  const [searchCondition, setSearchCondition] = useState<TrainSearchCondition>(
    initialSearch.condition,
  )
  const [submittedCondition, setSubmittedCondition] = useState<TrainSearchCondition>(
    initialSearch.condition,
  )
  const [departureDate, setDepartureDate] = useState(initialSearch.departureDate)
  const [selectedTrainType, setSelectedTrainType] = useState<TrainFilterType>('all')
  const [selectedTrain, setSelectedTrain] = useState<TrainResult | null>(null)
  const [reservationError, setReservationError] = useState('')

  const scheduleTrainType = scheduleTrainTypeByFilter[selectedTrainType]

  const {
    data: scheduleList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [
      'schedules',
      submittedCondition.departureStation,
      submittedCondition.arrivalStation,
      formatRequestDate(departureDate),
      scheduleTrainType,
    ],
    queryFn: () =>
      getSchedules({
        departureStation: submittedCondition.departureStation,
        arrivalStation: submittedCondition.arrivalStation,
        departureDate: formatRequestDate(departureDate),
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

  const reservationMutation = useMutation({
    mutationFn: createReservation,
    retry: false,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ['schedules'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['coaches', variables.scheduleId],
      })
      void queryClient.invalidateQueries({
        queryKey: ['seats', variables.scheduleId],
      })
    },
    onError: (error) => {
      if (isAxiosError<{ message?: string }>(error)) {
        if (error.response?.status === 409) {
          setReservationError(
            '예약 가능한 좌석이 부족하거나 좌석 상태가 변경됐습니다. 다시 확인해 주세요.',
          )

          void queryClient.invalidateQueries({
            queryKey: ['schedules'],
          })
          return
        }

        setReservationError(
          error.response?.data?.message ||
            '예약 요청을 완료하지 못했습니다. 네트워크와 예약 결과를 확인해 주세요.',
        )
        return
      }

      setReservationError('예약 생성 응답을 확인하지 못했습니다. 예약 결과를 확인해 주세요.')
    },
    onSettled: () => {
      isReservingRef.current = false
    },
  })

  const handleSearchSubmit = () => {
    setSearchParams(createSearchParams(searchCondition, departureDate), {
      replace: true,
    })
    setSubmittedCondition(searchCondition)
    setSelectedTrainType('all')
    setSelectedTrain(null)
    setReservationError('')
  }

  const handleTripTypeChange = (tripType: TripType) => {
    setSearchCondition((condition) => ({ ...condition, tripType }))
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

  const handleStationSwap = () => {
    setSearchCondition((condition) => ({
      ...condition,
      departureStation: condition.arrivalStation,
      arrivalStation: condition.departureStation,
    }))
    setSelectedTrain(null)
  }

  const handleTrainTypeChange = (trainType: TrainFilterType) => {
    setSelectedTrainType(trainType)
    setSelectedTrain(null)
  }

  const handleNextDaySearch = () => {
    const nextDepartureDate = addDays(departureDate, 1)
    const nextSearchCondition = {
      ...submittedCondition,
      dateLabel: formatDateLabel(nextDepartureDate),
      timeLabel: '00:00 이후',
    }

    setSearchParams(createSearchParams(nextSearchCondition, nextDepartureDate), {
      replace: true,
    })
    setDepartureDate(nextDepartureDate)
    setSearchCondition(nextSearchCondition)
    setSubmittedCondition(nextSearchCondition)
    setSelectedTrainType('all')
    setSelectedTrain(null)
    setReservationError('')
  }

  const handleSeatSelect = () => {
    if (!selectedTrain || isReservingRef.current) return

    const params = createSearchParams(submittedCondition, departureDate)

    navigate(`/seat-selection/${selectedTrain.id}?${params.toString()}`)
  }

  const handleReservation = () => {
    if (
      !selectedTrain ||
      !scheduleDetail ||
      isDetailPending ||
      isDetailError ||
      isReservingRef.current
    ) {
      return
    }

    isReservingRef.current = true
    setReservationError('')

    reservationMutation.mutate(
      {
        scheduleId: scheduleDetail.scheduleId,
        seatClass: 'STANDARD',
        passengerCount,
      },
      {
        onSuccess: ({ reservationId }) => {
          navigate(`/reservation-confirmation?reservationId=${reservationId}`)
        },
      },
    )
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
            <TrainResultList
              trains={trainResults}
              onTrainSelect={(train) => {
                setReservationError('')
                setSelectedTrain(train)
              }}
            />
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
          fareOption={{
            seatGrade: 'standard',
            label: '일반실',
            price: scheduleDetail
              ? (getFare(scheduleDetail, 'STANDARD') ?? selectedTrain.standardFare)
              : selectedTrain.standardFare,
          }}
          passengerSummary={`어른 ${passengerCount}명 기준`}
          isPending={isDetailPending}
          isError={isDetailError}
          isReservationPending={reservationMutation.isPending}
          reservationError={reservationError}
          onClose={() => {
            if (isReservingRef.current) return

            setReservationError('')
            setSelectedTrain(null)
          }}
          onReservationClick={handleReservation}
          onSeatSelectClick={handleSeatSelect}
        />
      )}
    </main>
  )
}

export default TrainSearchPage
