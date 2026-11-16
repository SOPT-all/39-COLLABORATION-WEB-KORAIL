import type { ComponentType } from 'react'

import SeatSelectionHeader from '@/pages/seat-selection/components/seat-selection-header'

import ExampleCard from '../example-card'

const [SeatSelectionCta] = Object.values(
  import.meta.glob<ComponentType<{ selectedSeatCount: number; onSeatSelectClick: () => void }>>(
    '/src/shared/components/seat-selection-cta.tsx',
    { eager: true, import: 'default' },
  ),
)

const SeatSelectionExamples = ({ onAction }: { onAction: (action: string) => void }) => (
  <>
    <ExampleCard heading='h4' title='좌석 선택 운행정보 헤더' fullWidth>
      <div className='h-64 overflow-y-auto'>
        <SeatSelectionHeader
          trainLabel='KTX,1'
          departureDateTime='10.26 (월) 오후 5:13'
          departureStation='서울'
          arrivalStation='부산'
          onClose={() => onAction('좌석 선택 닫기')}
        />

        <ol className='divide-y divide-gray-100 px-5'>
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index + 1} className='py-4 text-body-14-r'>
              좌석 {index + 1}열
            </li>
          ))}
        </ol>
      </div>
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

export default SeatSelectionExamples
