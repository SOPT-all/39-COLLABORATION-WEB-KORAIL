import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

const [TrainDetailActionButtons] = Object.values(
  import.meta.glob<
    ComponentType<{
      isReservationDisabled?: boolean
      onSeatSelectClick: () => void
      onReservationClick: () => void
    }>
  >('/src/pages/train-search/components/train-detail-action-buttons.tsx', {
    eager: true,
    import: 'default',
  }),
)

const TrainSearchExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!TrainDetailActionButtons) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <ExampleCard heading='h4' title='열차 상세 액션'>
      <div className='space-y-3'>
        <TrainDetailActionButtons
          onSeatSelectClick={() => onAction('열차 상세에서 좌석 선택')}
          onReservationClick={() => onAction('열차 상세에서 예매하기')}
        />
        <TrainDetailActionButtons
          isReservationDisabled
          onSeatSelectClick={() => onAction('열차 상세에서 좌석 선택')}
          onReservationClick={() => onAction('열차 상세에서 예매하기')}
        />
      </div>
    </ExampleCard>
  )
}

export default TrainSearchExamples
