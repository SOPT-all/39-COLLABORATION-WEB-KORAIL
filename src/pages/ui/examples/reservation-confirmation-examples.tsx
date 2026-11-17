import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

const [ReservationTitle] = Object.values(
  import.meta.glob<ComponentType>(
    '/src/pages/reservation-confirmation/components/reservation-title.tsx',
    { eager: true, import: 'default' },
  ),
)
const [ReservationNotice] = Object.values(
  import.meta.glob<ComponentType>(
    '/src/pages/reservation-confirmation/components/reservation-notice.tsx',
    { eager: true, import: 'default' },
  ),
)

const ReservationConfirmationExamples = () => {
  if (!ReservationTitle && !ReservationNotice) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <>
      {ReservationTitle && (
        <ExampleCard heading='h4' title='결제 대기 제목'>
          <ReservationTitle />
        </ExampleCard>
      )}
      {ReservationNotice && (
        <ExampleCard heading='h4' title='결제 대기 안내사항'>
          <ReservationNotice />
        </ExampleCard>
      )}
    </>
  )
}

export default ReservationConfirmationExamples
