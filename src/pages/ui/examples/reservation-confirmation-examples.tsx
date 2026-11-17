import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

const [PaymentButton] = Object.values(
  import.meta.glob<ComponentType<{ onClick?: () => void }>>(
    '/src/pages/reservation-confirmation/components/payment-button.tsx',
    { eager: true, import: 'default' },
  ),
)

const ReservationConfirmationExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!PaymentButton) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <ExampleCard heading='h4' title='결제하기 버튼'>
      <PaymentButton onClick={() => onAction('결제하기')} />
    </ExampleCard>
  )
}

export default ReservationConfirmationExamples
