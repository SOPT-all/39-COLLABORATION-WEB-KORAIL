import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useNavigate, useParams } from 'react-router'

import { createReservation } from './api/create-reservation'
import { getSeatLayout } from './api/get-seat-layout'
import CarSelectionSheet, { type CoachOption } from './components/car-selection-sheet'
import CarSelectionTrigger from './components/car-selection-trigger'
import SeatGrid from './components/seat-grid'
import SeatSelectionCta from './components/seat-selection-cta'
import SeatSelectionHeader from './components/seat-selection-header'
import SeatSelectionNoticeModal from './components/seat-selection-notice-modal'

const departureStation = '서울'
const arrivalStation = '부산'

// 호차 조회 연결 전 테스트용 ID
const TEMP_COACH_ID = 1

const previewCoaches: CoachOption[] = [17, 6, 0, 13, 5, 0, 0, 3, 0].map(
  (remainingSeatCount, index) => ({
    coachId: 101 + index,
    coachNumber: index + 1,
    remainingSeatCount,
    totalSeatCount: 56,
    reservable: remainingSeatCount > 0,
    description: index === 3 ? '유아동반석,휠체어석,전동휠체어석' : undefined,
  }),
)

interface ReservationErrorResponse {
  message?: string
}

const SeatSelectionContent = ({ scheduleId }: { scheduleId: number }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isSubmittingRef = useRef(false)

  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)
  const [reservationError, setReservationError] = useState('')

  const {
    data: seatLayout,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['seats', scheduleId, TEMP_COACH_ID],
    queryFn: () => getSeatLayout(scheduleId, TEMP_COACH_ID),
    staleTime: 0,
  })

  const reservationMutation = useMutation({
    mutationFn: createReservation,
    retry: false,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['seats', scheduleId],
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

  // 호차 조회 연결 전까지 1호차에만 실제 좌석 응답을 반영
  const coaches = previewCoaches.map((coach) =>
    coach.coachNumber === seatLayout.coachNumber
      ? {
          ...coach,
          coachId: seatLayout.coachId,
          remainingSeatCount: seatLayout.remainingSeatCount,
          totalSeatCount: seatLayout.totalSeatCount,
          reservable: seatLayout.remainingSeatCount > 0,
        }
      : coach,
  )

  return (
    <main className='flex h-dvh flex-col overflow-hidden bg-slate-50'>
      <div className='relative z-10 shrink-0 bg-gray-0 pb-1 shadow-[0_2px_2px_rgba(0,0,0,0.08)]'>
        <SeatSelectionHeader
          trainLabel='KTX,1'
          departureDateTime='10.26 (월) 오후 5:13'
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          onClose={() => navigate('/train-search')}
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
