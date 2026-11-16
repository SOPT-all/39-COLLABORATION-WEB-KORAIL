import { useState, type ButtonHTMLAttributes, type ComponentType } from 'react'

import type {
  TrainDetailInfo,
  TrainFareOption,
  TrainSeatGrade,
} from '@/pages/train-search/types/train-detail'

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
const [Button] = Object.values(
  import.meta.glob<ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & { width?: 343 }>>(
    '/src/shared/components/button.tsx',
    { eager: true, import: 'default' },
  ),
)
const [TrainDetailSheet] = Object.values(
  import.meta.glob<
    ComponentType<{
      open: boolean
      train: TrainDetailInfo
      fareOptions: TrainFareOption[]
      selectedSeatGrade: TrainSeatGrade
      passengerSummary: string
      onClose: () => void
      onStopDetailClick: () => void
      onSeatGradeChange: (seatGrade: TrainSeatGrade) => void
      onReservationClick: () => void
      onSeatSelectClick: () => void
    }>
  >('/src/pages/train-search/components/train-detail-sheet.tsx', {
    eager: true,
    import: 'default',
  }),
)

const trainDetailSample: TrainDetailInfo = {
  trainType: 'itx-saemaeul',
  trainNumber: '001',
  departureDate: '10.26 (월)',
  departureTime: '05:13',
  departureStation: '서울',
  arrivalTime: '07:50',
  arrivalStation: '부산',
  duration: '2시간 37분',
  stopStation: '서대구정차',
}

const trainFareOptions: TrainFareOption[] = [
  { seatGrade: 'standard', label: '일반실', price: 78400 },
  { seatGrade: 'first-class', label: '특실', price: 78400 },
]

const TrainSearchExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  const [isTrainDetailOpen, setIsTrainDetailOpen] = useState(false)
  const [selectedSeatGrade, setSelectedSeatGrade] = useState<TrainSeatGrade>('standard')

  const handleSeatGradeChange = (seatGrade: TrainSeatGrade) => {
    setSelectedSeatGrade(seatGrade)
    onAction(seatGrade === 'standard' ? '일반실 선택' : '특실 선택')
  }

  if (!TrainDetailActionButtons && !NextDaySearchButton && !TrainDetailSheet) {
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
      {Button && TrainDetailSheet && (
        <ExampleCard heading='h4' title='열차 상세 시트'>
          <Button className='max-w-full' width={343} onClick={() => setIsTrainDetailOpen(true)}>
            열차 상세 시트 열기
          </Button>

          <TrainDetailSheet
            open={isTrainDetailOpen}
            train={trainDetailSample}
            fareOptions={trainFareOptions}
            selectedSeatGrade={selectedSeatGrade}
            passengerSummary='어른 1명 기준'
            onClose={() => setIsTrainDetailOpen(false)}
            onStopDetailClick={() => onAction('정차역과 소요시간 상세')}
            onSeatGradeChange={handleSeatGradeChange}
            onReservationClick={() => onAction('바로 예매하기')}
            onSeatSelectClick={() => onAction('좌석 선택')}
          />
        </ExampleCard>
      )}
    </>
  )
}

export default TrainSearchExamples
