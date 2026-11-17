import type { ComponentType } from 'react'

import type { TrainResult, TrainType } from '@/pages/train-search/types/train-result'

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

const [TrainResultList] = Object.values(
  import.meta.glob<
    ComponentType<{
      trains: TrainResult[]
      onTrainSelect?: (train: TrainResult) => void
    }>
  >('/src/pages/train-search/components/train-result-list.tsx', {
    eager: true,
    import: 'default',
  }),
)

const trainLabels: Record<TrainType, string> = {
  ktx: 'KTX',
  'itx-cheongchun': 'ITX-청춘',
  'itx-saemaeul': 'ITX-새마을',
  mugunghwa: '무궁화',
}

const trainResultSamples: TrainResult[] = (
  ['ktx', 'itx-cheongchun', 'itx-saemaeul', 'mugunghwa'] as TrainType[]
).map((trainType) => ({
  id: trainType,
  trainType,
  trainNumber: '001',
  departureTime: '05:13',
  departureStation: '서울',
  arrivalTime: '07:50',
  arrivalStation: '부산',
  duration: '2시간 37분',
  stopStation: '서대구정차',
  standardFare: 78400,
  firstClassFare: 78400,
  rewardRate: 5,
}))

const TrainSearchExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!TrainDetailActionButtons && !NextDaySearchButton && !TrainResultList) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <>
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
      {TrainResultList && (
        <ExampleCard heading='h4' title='열차 조회 결과 목록 · 결과 있음 / 없음'>
          <div className='space-y-5'>
            <TrainResultList
              trains={trainResultSamples}
              onTrainSelect={(train) => {
                onAction(`${trainLabels[train.trainType]} ${train.trainNumber} 열차 선택`)
              }}
            />
            <TrainResultList trains={[]} />
          </div>
        </ExampleCard>
      )}
    </>
  )
}

export default TrainSearchExamples
