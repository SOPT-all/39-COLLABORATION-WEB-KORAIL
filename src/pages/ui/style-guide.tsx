import { useState, type ButtonHTMLAttributes, type ComponentType } from 'react'

import BottomSheet from '@/shared/components/bottom-sheet'
import ExampleCard from './example-card'
import HomeExamples from './examples/home-examples'
import ReservationConfirmationExamples from './examples/reservation-confirmation-examples'
import SeatSelectionExamples from './examples/seat-selection-examples'
import TrainSearchExamples from './examples/train-search-examples'

const [Header] = Object.values(
  import.meta.glob<ComponentType>('/src/shared/components/header.tsx', {
    eager: true,
    import: 'default',
  }),
)
const [Button] = Object.values(
  import.meta.glob<
    ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' }>
  >('/src/shared/components/button.tsx', { eager: true, import: 'default' }),
)
const [TrainTimeRow] = Object.values(
  import.meta.glob<ComponentType<typeof trainTimeSample & { stopStation?: string }>>(
    '/src/shared/components/train-time-row.tsx',
    { eager: true, import: 'default' },
  ),
)
const trainTimeSample = {
  departureTime: '05:13',
  departureStation: '서울',
  arrivalTime: '07:50',
  arrivalStation: '부산',
  duration: '2시간 37분',
}

const colorSamples = [
  { token: 'blue-500', label: '기본 버튼', swatch: 'bg-blue-500' },
  { token: 'blue-700', label: '눌린 버튼', swatch: 'bg-blue-700' },
  { token: 'slate-200', label: '비활성 버튼', swatch: 'bg-slate-200' },
  { token: 'slate-50', label: '정보 영역 배경', swatch: 'bg-slate-50' },
  { token: 'gray-0', label: '흰색 배경', swatch: 'bg-gray-0' },
  { token: 'gray-900', label: '본문 글자', swatch: 'bg-gray-900' },
]

const typographySamples = [
  { className: 'text-title-22-b', example: '승차권 예매 홈' },
  { className: 'text-subtitle-20-b', example: '서울 → 부산' },
  { className: 'text-heading-16-b', example: '좌석 선택' },
  { className: 'text-body-14-b', example: '열차 조회' },
  { className: 'text-body-14-r', example: '운임 78,400원' },
  { className: 'text-label-12-r', example: '잔여 17석' },
]

const UiPage = () => {
  const [lastAction, setLastAction] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const hasSharedExamples = Header || Button || TrainTimeRow

  return (
    <main className='mx-auto max-w-[375px] space-y-8 bg-gray-0 p-4 text-slate-900'>
      <header className='space-y-3'>
        <h1 className='text-title-22-b'>코레일 UI 가이드</h1>
        <nav aria-label='UI 가이드 목록' className='flex flex-wrap gap-x-4 gap-y-2 text-body-14-m'>
          <a className='text-blue-700 underline' href='#ui-shared'>
            공통 컴포넌트
          </a>
          <a className='text-blue-700 underline' href='#ui-pages'>
            페이지별 컴포넌트
          </a>
          <a className='text-blue-700 underline' href='#ui-colors'>
            색상
          </a>
          <a className='text-blue-700 underline' href='#ui-typography'>
            글자 스타일
          </a>
        </nav>
      </header>

      <section aria-labelledby='ui-shared' className='space-y-4'>
        <h2 id='ui-shared' className='text-heading-16-b'>
          공통 컴포넌트
        </h2>
        {!hasSharedExamples && (
          <p className='text-body-14-r text-gray-600'>
            해당 브랜치에 포함된 공통 컴포넌트 예시가 없어요.
          </p>
        )}
        {Header && (
          <ExampleCard title='공통 헤더' fullWidth>
            <Header />
          </ExampleCard>
        )}
        {Button && (
          <ExampleCard title='버튼'>
            <div className='flex flex-col items-start gap-2 px-2'>
              <Button onClick={() => setLastAction('열차 조회하기')}>열차 조회하기</Button>
              <Button disabled>열차 조회하기</Button>
              <Button variant='outline' onClick={() => setLastAction('좌석 선택')}>
                좌석 선택
              </Button>
            </div>
          </ExampleCard>
        )}
        {TrainTimeRow && (
          <ExampleCard title='열차 시간 정보 · 정차역 배지 있음 / 없음'>
            <div className='space-y-3'>
              <TrainTimeRow {...trainTimeSample} stopStation='서대구정차' />
              <TrainTimeRow {...trainTimeSample} />
            </div>
          </ExampleCard>
        )}
        {Button && (
          <ExampleCard title='바텀시트'>
            <div className='px-2'>
              <Button onClick={() => setIsSheetOpen(true)}>호차 선택 예시</Button>
            </div>

            <BottomSheet
              open={isSheetOpen}
              onClose={() => setIsSheetOpen(false)}
              title='호차 선택'
              maxBodyHeight={399}
              bottomPadding={60}
            >
              <ul className='divide-y divide-gray-200'>
                {Array.from({ length: 20 }, (_, index) => index + 1).map((carNumber) => (
                  <li key={carNumber} className='py-4'>
                    일반실 {carNumber}호차
                  </li>
                ))}
              </ul>
            </BottomSheet>
          </ExampleCard>
        )}
      </section>

      <section aria-labelledby='ui-pages' className='space-y-4'>
        <h2 id='ui-pages' className='text-heading-16-b'>
          페이지별 컴포넌트
        </h2>
        <div className='space-y-4'>
          <h3 className='text-body-14-b'>홈</h3>
          <HomeExamples onAction={setLastAction} />
        </div>
        <div className='space-y-4'>
          <h3 className='text-body-14-b'>열차 조회</h3>
          <TrainSearchExamples onAction={setLastAction} />
        </div>
        <div className='space-y-4'>
          <h3 className='text-body-14-b'>좌석 선택</h3>
          <SeatSelectionExamples onAction={setLastAction} />
        </div>
        <div className='space-y-4'>
          <h3 className='text-body-14-b'>결제 대기</h3>
          <ReservationConfirmationExamples />
        </div>
        <p role='status' className='text-body-14-r text-gray-700'>
          {lastAction
            ? `마지막 동작 · ${lastAction}`
            : '예시 버튼을 누르면 여기에 동작이 표시돼요.'}
        </p>
      </section>

      <section aria-labelledby='ui-colors' className='space-y-3'>
        <h2 id='ui-colors' className='text-heading-16-b'>
          색상
        </h2>
        <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {colorSamples.map(({ token, label, swatch }) => (
            <li key={token} className='overflow-hidden rounded-8 border border-slate-200'>
              <div aria-hidden='true' className={`h-10 ${swatch}`} />
              <div className='space-y-1 border-t border-slate-200 p-2'>
                <p className='text-body-14-r'>{label}</p>
                <code className='text-label-12-r text-gray-700'>{token}</code>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby='ui-typography' className='space-y-3'>
        <h2 id='ui-typography' className='text-heading-16-b'>
          타이포그래피
        </h2>
        <ul className='divide-y divide-slate-200 rounded-8 border border-slate-200'>
          {typographySamples.map(({ className, example }) => (
            <li key={className} className='space-y-1 p-3'>
              <code className='text-label-12-r text-gray-700'>{className}</code>
              <p className={className}>{example}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default UiPage
