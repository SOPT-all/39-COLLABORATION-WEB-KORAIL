import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'

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
// /seat-selection/13에서 확인 가능
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

const SeatSelectionContent = ({ scheduleId }: { scheduleId: number }) => {
  const navigate = useNavigate()

  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)

  const {
    data: seatLayout,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['seats', scheduleId, TEMP_COACH_ID],
    queryFn: () => getSeatLayout(scheduleId, TEMP_COACH_ID),
    staleTime: 0,
  })

  const selectedSeat = seatLayout?.seats.find(
    (seat) => seat.seatId === selectedSeatId && seat.available,
  )

  const handleSeatChange = (nextSeatId: number | null) => {
    if (selectedSeat && nextSeatId !== null) {
      setIsNoticeOpen(true)
      return
    }

    setSelectedSeatId(nextSeatId)
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

      <div className='shrink-0'>
        <SeatSelectionCta
          selectedSeatCount={selectedSeat ? 1 : 0}
          onSeatSelectClick={() => navigate('/reservation-confirmation')}
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
