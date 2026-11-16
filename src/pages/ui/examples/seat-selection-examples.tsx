import { useState, type ComponentType } from 'react'

import CarSelectionSheet, {
  type CoachOption,
} from '@/pages/seat-selection/components/car-selection-sheet'
import Button from '@/shared/components/button'

import ExampleCard from '../example-card'

const [SeatSelectionCta] = Object.values(
  import.meta.glob<ComponentType<{ selectedSeatCount: number; onSeatSelectClick: () => void }>>(
    '/src/shared/components/seat-selection-cta.tsx',
    { eager: true, import: 'default' },
  ),
)

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

const SeatSelectionExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  const [isCarSheetOpen, setIsCarSheetOpen] = useState(false)

  return (
    <>
      <ExampleCard heading='h4' title='호차 선택 바텀시트'>
        <div className='px-2'>
          <Button aria-haspopup='dialog' onClick={() => setIsCarSheetOpen(true)}>
            호차 선택
          </Button>
        </div>

        <CarSelectionSheet
          open={isCarSheetOpen}
          onClose={() => setIsCarSheetOpen(false)}
          coaches={sampleCoaches}
          onSelectCoach={() => {
            setIsCarSheetOpen(false)
            onAction('일반실 1호차 선택')
          }}
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
