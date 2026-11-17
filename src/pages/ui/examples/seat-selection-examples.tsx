import { useState } from 'react'

import CarSelectionSheet, {
  type CoachOption,
} from '@/pages/seat-selection/components/car-selection-sheet'
import SeatGrid, { type Seat } from '@/pages/seat-selection/components/seat-grid'
import SeatSelectionCta from '@/pages/seat-selection/components/seat-selection-cta'
import SeatSelectionHeader from '@/pages/seat-selection/components/seat-selection-header'
import CarSelectionTrigger from '@/pages/seat-selection/components/car-selection-trigger'

import ExampleCard from '../example-card'

const sampleCoaches: CoachOption[] = [17, 6, 0, 13, 5, 0, 0, 3, 0].map(
  (remainingSeatCount, index) => ({
    coachId: 101 + index,
    coachNumber: index + 1,
    remainingSeatCount,
    totalSeatCount: 56,
    reservable: remainingSeatCount > 0,
    description: index === 3 ? '유아동반석,휠체어석,전동휠체어석' : undefined,
  }),
)

const [firstCoach] = sampleCoaches

const columns = ['A', 'B', 'C', 'D'] as const
const availableSeats = new Set([
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

const exampleSeats = Array.from({ length: 14 }, (_, rowIndex) =>
  columns.map((column, columnIndex): Seat => {
    const row = rowIndex + 1
    const seatNumber = `${row}${column}`

    return {
      seatId: rowIndex * columns.length + columnIndex + 1,
      seatNumber,
      row,
      column,
      direction: row <= 8 ? 'BACKWARD' : 'FORWARD',
      available: availableSeats.has(seatNumber),
    }
  }),
).flat()

const SeatSelectionExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)

  return (
    <>
      <ExampleCard heading='h4' title='좌석 선택 운행정보 · 호차 선택 · 좌석 배치' fullWidth>
        <div className='flex h-[420px] flex-col'>
          <SeatSelectionHeader
            trainLabel='KTX,1'
            departureDateTime='10.26 (월) 오후 5:13'
            departureStation='서울'
            arrivalStation='부산'
            onClose={() => onAction('좌석 선택 닫기')}
          />

          <CarSelectionTrigger
            coachNumber={firstCoach.coachNumber}
            remainingSeatCount={firstCoach.remainingSeatCount}
            totalSeatCount={firstCoach.totalSeatCount}
            onClick={() => setIsCarSheetOpen(true)}
          />

          <div className='min-h-0 flex-1 overflow-y-auto py-2'>
            <SeatGrid
              seats={exampleSeats}
              selectedSeatId={selectedSeatId}
              departureStation='서울'
              arrivalStation='부산'
              onSeatChange={setSelectedSeatId}
            />
          </div>
        </div>

        <CarSelectionSheet
          open={isCarSheetOpen}
          onClose={() => setIsCarSheetOpen(false)}
          coaches={sampleCoaches}
          onSelectCoach={() => {
            setIsCarSheetOpen(false)
            onAction(`일반실 ${firstCoach.coachNumber}호차 선택`)
          }}
        />
      </ExampleCard>

      <ExampleCard heading='h4' title='좌석 선택 하단 액션 · 미선택' fullWidth>
        <SeatSelectionCta
          selectedSeatCount={0}
          onSeatSelectClick={() => onAction('좌석 선택 완료')}
        />
      </ExampleCard>

      <ExampleCard heading='h4' title='좌석 선택 하단 액션 · 1석 선택' fullWidth>
        <SeatSelectionCta
          selectedSeatCount={1}
          onSeatSelectClick={() => onAction('좌석 선택 완료')}
        />
      </ExampleCard>
    </>
  )
}

export default SeatSelectionExamples
