import { useState } from 'react'
import { useNavigate } from 'react-router'

import CarSelectionSheet, { type CoachOption } from './components/car-selection-sheet'
import CarSelectionTrigger from './components/car-selection-trigger'
import SeatGrid, { type Seat } from './components/seat-grid'
import SeatSelectionCta from './components/seat-selection-cta'
import SeatSelectionHeader from './components/seat-selection-header'
import SeatSelectionNoticeModal from './components/seat-selection-notice-modal'

const departureStation = '서울'
const arrivalStation = '부산'

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

const [firstCoach] = previewCoaches
const columns = ['A', 'B', 'C', 'D'] as const

const availableSeatNumbers = new Set([
  '1A',
  '1C',
  '2B',
  '2C',
  '2D',
  '3B',
  '3C',
  '6A',
  '6B',
  '6C',
  '6D',
  '7C',
  '7D',
  '8B',
  '8D',
  '13B',
  '14C',
])

const previewSeats = Array.from({ length: 14 }, (_, rowIndex) =>
  columns.map((column, columnIndex): Seat => {
    const row = rowIndex + 1
    const seatNumber = `${row}${column}`

    return {
      seatId: rowIndex * columns.length + columnIndex + 1,
      seatNumber,
      row,
      column,
      direction: row <= 8 ? 'BACKWARD' : 'FORWARD',
      available: availableSeatNumbers.has(seatNumber),
    }
  }),
).flat()

const SeatSelectionPage = () => {
  const navigate = useNavigate()

  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)

  const closeCarSheet = () => setIsCarSheetOpen(false)

  const handleSeatChange = (nextSeatId: number | null) => {
    if (selectedSeatId !== null && nextSeatId !== null) {
      setIsNoticeOpen(true)
      return
    }

    setSelectedSeatId(nextSeatId)
  }

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
          coachNumber={firstCoach.coachNumber}
          remainingSeatCount={firstCoach.remainingSeatCount}
          totalSeatCount={firstCoach.totalSeatCount}
          onClick={() => setIsCarSheetOpen(true)}
        />
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain py-5'>
        <SeatGrid
          seats={previewSeats}
          selectedSeatId={selectedSeatId}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          onSeatChange={handleSeatChange}
        />
      </div>

      <div className='shrink-0'>
        <SeatSelectionCta
          selectedSeatCount={selectedSeatId === null ? 0 : 1}
          onSeatSelectClick={() => undefined}
        />
      </div>

      <CarSelectionSheet
        open={isCarSheetOpen}
        onClose={closeCarSheet}
        coaches={previewCoaches}
        onSelectCoach={closeCarSheet}
      />

      <SeatSelectionNoticeModal open={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />
    </main>
  )
}

export default SeatSelectionPage
