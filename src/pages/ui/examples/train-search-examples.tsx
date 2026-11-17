import type { ComponentType } from 'react'

import type { TrainSearchCondition } from '@/pages/train-search/types/train-search-condition'

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
const [NextDaySearchButton] = Object.values(
  import.meta.glob<ComponentType<{ nextDateLabel: string; onClick?: () => void }>>(
    '/src/pages/train-search/components/next-day-search-button.tsx',
    { eager: true, import: 'default' },
  ),
)

const [TrainSearchForm] = Object.values(
  import.meta.glob<
    ComponentType<{
      condition: TrainSearchCondition
      onSubmit: () => void
    }>
  >('/src/pages/train-search/components/train-search-form.tsx', {
    eager: true,
    import: 'default',
  }),
)

const initialCondition: TrainSearchCondition = {
  tripType: 'round-trip',
  dateLabel: '10.26 (월)',
  timeLabel: '01:00 이후',
  departureStation: '서울',
  arrivalStation: '부산',
  seatGradeLabel: '전체',
  passengerLabel: '어른 1명',
  isSeoulAreaIncluded: false,
  isAdjacentStationIncluded: false,
}

const TrainSearchExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!TrainDetailActionButtons && !NextDaySearchButton && !TrainSearchForm) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <>
      {TrainSearchForm && (
        <ExampleCard heading='h4' title='열차 조회 조건'>
          <TrainSearchForm condition={initialCondition} onSubmit={() => onAction('열차 조회')} />
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
      {NextDaySearchButton && (
        <ExampleCard heading='h4' title='다음날 열차 조회'>
          <NextDaySearchButton
            nextDateLabel='10.27 (화)'
            onClick={() => onAction('다음날 열차 조회')}
          />
        </ExampleCard>
      )}
    </>
  )
}

export default TrainSearchExamples
