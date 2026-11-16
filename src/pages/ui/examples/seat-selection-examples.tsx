import { useState, type ComponentType } from 'react'

import SeatGrid, { type Seat } from '@/pages/seat-selection/components/seat-grid'

import ExampleCard from '../example-card'

const [SeatSelectionCta] = Object.values(
  import.meta.glob<ComponentType<{ selectedSeatCount: number; onSeatSelectClick: () => void }>>(
    '/src/shared/components/seat-selection-cta.tsx',
    { eager: true, import: 'default' },
  ),
)

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
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null)

  return (
    <>
      <ExampleCard heading='h4' title='일반실 1호차 좌석 배치' fullWidth>
        <SeatGrid
          seats={exampleSeats}
          selectedSeatId={selectedSeatId}
          departureStation='서울'
          arrivalStation='부산'
          onSeatChange={setSelectedSeatId}
        />
      </ExampleCard>

      {SeatSelectionCta && (
        <>
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
      )}
    </>
  )
}

export default SeatSelectionExamples
