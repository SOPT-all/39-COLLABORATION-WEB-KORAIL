import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useNavigate, useParams, useSearchParams } from 'react-router'

import { getScheduleDetail } from '@/pages/train-search/api/get-schedule-detail'

import { createReservation } from './api/create-reservation'
import { getCoaches } from './api/get-coaches'
import { getSeatLayout } from './api/get-seat-layout'
import CarSelectionSheet from './components/car-selection-sheet'
import CarSelectionTrigger from './components/car-selection-trigger'
import SeatGrid from './components/seat-grid'
import SeatSelectionCta from './components/seat-selection-cta'
import SeatSelectionHeader from './components/seat-selection-header'
import SeatSelectionNoticeModal from './components/seat-selection-notice-modal'

const formatDepartureDateTime = (dateTime: string) => {
  const [year, month, day] = dateTime.slice(0, 10).split('-').map(Number)
  const hour = Number(dateTime.slice(11, 13))
  const minute = dateTime.slice(14, 16)
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][
    new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  ]
  const period = hour < 12 ? '오전' : '오후'
  const displayHour = hour % 12 || 12

  return `${month}.${day} (${weekday}) ${period} ${displayHour}:${minute}`
}

interface ReservationErrorResponse {
  message?: string
}

const SeatSelectionContent = ({ scheduleId }: { scheduleId: number }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const departureStation = searchParams.get('departureStation') || '서울'
  const arrivalStation = searchParams.get('arrivalStation') || '부산'
  const queryClient = useQueryClient()
  const isSubmittingRef = useRef(false)

  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)
  const [reservationError, setReservationError] = useState('')

  const {
    data: coachList,
    isPending: isCoachesPending,
    isError: isCoachesError,
  } = useQuery({
    queryKey: ['coaches', scheduleId],
    queryFn: () => getCoaches(scheduleId),
    staleTime: 0,
  })

  const firstCoach = coachList?.coaches.find((coach) => coach.coachNumber === 1)
  const coachId = firstCoach?.coachId

  const {
    data: schedule,
    isPending: isSchedulePending,
    isError: isScheduleError,
  } = useQuery({
    queryKey: ['schedule-detail', scheduleId, 1],
    queryFn: () => getScheduleDetail(scheduleId, 1),
  })

  const {
    data: seatLayout,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['seats', scheduleId, coachId],
    queryFn: () => {
      if (coachId === undefined) {
        throw new Error('1호차 정보를 찾을 수 없습니다.')
      }

      return getSeatLayout(scheduleId, coachId)
    },
    enabled: coachId !== undefined,
    staleTime: 0,
  })

  const reservationMutation = useMutation({
    mutationFn: createReservation,
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['seats', scheduleId],
      })
      void queryClient.invalidateQueries({
        queryKey: ['coaches', scheduleId],
      })
    },
    onError: (error) => {
      if (isAxiosError<ReservationErrorResponse>(error)) {
        if (error.response?.status === 409) {
          setSelectedSeatId(null)
          setReservationError('좌석 상태가 변경됐습니다. 다시 선택해 주세요.')

          void queryClient.invalidateQueries({
            queryKey: ['seats', scheduleId],
          })
          void queryClient.invalidateQueries({
            queryKey: ['coaches', scheduleId],
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
      isSubmittingRef.current = false
    },
  })

  const selectedSeat = seatLayout?.seats.find(
    (seat) => seat.seatId === selectedSeatId && seat.available,
  )

  const handleSeatChange = (nextSeatId: number | null) => {
    if (isSubmittingRef.current) {
      return
    }

    if (selectedSeat && nextSeatId !== null) {
      setIsNoticeOpen(true)
      return
    }

    setReservationError('')
    setSelectedSeatId(nextSeatId)
  }

  const handleCreateReservation = () => {
    if (!seatLayout || !selectedSeat || isSubmittingRef.current) {
      return
    }

    isSubmittingRef.current = true
    setReservationError('')

    reservationMutation.mutate(
      {
        scheduleId,
        seatClass: 'STANDARD',
        passengerCount: 1,
        seatIds: [selectedSeat.seatId],
      },
      {
        onSuccess: ({ reservationId }) => {
          navigate(`/reservation-confirmation?reservationId=${reservationId}`)
        },
      },
    )
  }

  if (isScheduleError) {
    return <p className='p-4'>열차 정보를 불러오지 못했습니다.</p>
  }

  if (isSchedulePending || !schedule) {
    return (
      <p className='p-4' role='status'>
        열차 정보를 불러오는 중입니다.
      </p>
    )
  }

  if (isCoachesError) {
    return <p className='p-4'>호차 정보를 불러오지 못했습니다.</p>
  }

  if (isCoachesPending) {
    return (
      <p className='p-4' role='status'>
        호차 정보를 불러오는 중입니다.
      </p>
    )
  }

  if (!firstCoach) {
    return <p className='p-4'>이 열차의 일반실 1호차 정보를 찾을 수 없습니다.</p>
  }

  if (isError) {
    return <p className='p-4'>좌석 정보를 불러오지 못했습니다.</p>
  }

  if (isPending || !seatLayout) {
    return (
      <p className='p-4' role='status'>
        좌석 정보를 불러오는 중입니다.
      </p>
    )
  }

  const coaches = (coachList?.coaches ?? []).map((coach) =>
    coach.coachId === seatLayout.coachId
      ? {
          ...coach,
          remainingSeatCount: seatLayout.remainingSeatCount,
          totalSeatCount: seatLayout.totalSeatCount,
        }
      : coach,
  )

  return (
    <main className='flex h-dvh flex-col overflow-hidden bg-slate-50'>
      <div className='relative z-10 shrink-0 bg-gray-0 pb-1 shadow-[0_2px_2px_rgba(0,0,0,0.08)]'>
        <SeatSelectionHeader
          trainLabel={`${schedule.trainTypeName},${schedule.trainNumber}`}
          departureDateTime={formatDepartureDateTime(schedule.departureAt)}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          onClose={() => {
            const params = new URLSearchParams({
              departureStation,
              arrivalStation,
              departureDate: schedule.departureAt.slice(0, 10),
            })

            navigate(`/train-search?${params.toString()}`)
          }}
        />

        <CarSelectionTrigger
          coachNumber={seatLayout.coachNumber}
          remainingSeatCount={seatLayout.remainingSeatCount}
          totalSeatCount={seatLayout.totalSeatCount}
          onClick={() => setIsCarSheetOpen(true)}
        />
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain py-5'>
        <SeatGrid
          seats={seatLayout.seats}
          selectedSeatId={selectedSeat?.seatId ?? null}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          onSeatChange={handleSeatChange}
        />
      </div>

      <div className='shrink-0 bg-gray-0'>
        {reservationError && (
          <p className='px-4 pt-3 text-body-14-r text-red-450' role='alert'>
            {reservationError}
          </p>
        )}

        <SeatSelectionCta
          selectedSeatCount={selectedSeat ? 1 : 0}
          isPending={reservationMutation.isPending}
          onSeatSelectClick={handleCreateReservation}
        />
      </div>

      <CarSelectionSheet
        open={isCarSheetOpen}
        onClose={() => setIsCarSheetOpen(false)}
        coaches={coaches}
        onSelectCoach={() => setIsCarSheetOpen(false)}
      />

      <SeatSelectionNoticeModal open={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />
    </main>
  )
}

const SeatSelectionPage = () => {
  const { trainRunId } = useParams()
  const scheduleId = Number(trainRunId)

  if (!Number.isSafeInteger(scheduleId) || scheduleId <= 0) {
    return <p className='p-4'>올바른 운행 일정 주소가 아닙니다.</p>
  }

  return <SeatSelectionContent key={scheduleId} scheduleId={scheduleId} />
}

export default SeatSelectionPage
