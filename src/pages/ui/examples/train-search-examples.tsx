import { useState, type ComponentType } from 'react'

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

type TrainType = 'all' | 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

const [TrainTypeFilter] = Object.values(
  import.meta.glob<
    ComponentType<{
      selectedTrainType: TrainType
      onTrainTypeChange: (trainType: TrainType) => void
    }>
  >('/src/pages/train-search/components/train-type-filter.tsx', {
    eager: true,
    import: 'default',
  }),
)

const TrainSearchExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  const [selectedTrainType, setSelectedTrainType] = useState<TrainType>('mugunghwa')

  if (!TrainDetailActionButtons && !TrainTypeFilter) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  const handleTrainTypeChange = (trainType: TrainType) => {
    setSelectedTrainType(trainType)
    onAction(`열차 종류 필터 · ${trainType}`)
  }

  return (
    <>
      {TrainTypeFilter && (
        <ExampleCard heading='h4' title='열차 종류 필터'>
          <TrainTypeFilter
            selectedTrainType={selectedTrainType}
            onTrainTypeChange={handleTrainTypeChange}
          />
        </ExampleCard>
      )}
      {TrainDetailActionButtons && (
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
      )}
    </>
  )
}

export default TrainSearchExamples
