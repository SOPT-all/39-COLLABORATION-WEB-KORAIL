import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

const [SeatSelectionCta] = Object.values(
  import.meta.glob<ComponentType<{ selectedSeatCount: number; onSeatSelectClick: () => void }>>(
    '/src/shared/components/seat-selection-cta.tsx',
    { eager: true, import: 'default' },
  ),
)

const SeatSelectionExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!SeatSelectionCta) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
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
  )
}

export default SeatSelectionExamples
