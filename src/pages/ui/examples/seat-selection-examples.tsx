import { useState, type ComponentType } from 'react'

import SeatSelectionNoticeModal from '@/pages/seat-selection/components/seat-selection-notice-modal'
import Button from '@/shared/components/button'

import ExampleCard from '../example-card'

const [SeatSelectionCta] = Object.values(
  import.meta.glob<ComponentType<{ selectedSeatCount: number; onSeatSelectClick: () => void }>>(
    '/src/shared/components/seat-selection-cta.tsx',
    { eager: true, import: 'default' },
  ),
)

const SeatSelectionExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)

  return (
    <>
      <ExampleCard heading='h4' title='좌석 선택 안내 모달'>
        <Button className='mx-auto max-w-full' onClick={() => setIsNoticeOpen(true)}>
          안내 모달 열기
        </Button>
      </ExampleCard>

      <SeatSelectionNoticeModal open={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />

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
