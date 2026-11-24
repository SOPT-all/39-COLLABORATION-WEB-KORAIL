import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

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
const [ReservationCard] = Object.values(
  import.meta.glob<
    ComponentType<{
      trainType: TrainType
      trainNumber: string
      departureTime: string
      departureStation: string
      arrivalTime: string
      arrivalStation: string
      duration: string
      stopStation?: string
      seat: string
      paymentDeadline: string
    }>
  >('/src/pages/reservation-confirmation/components/reservation-card.tsx', {
    eager: true,
    import: 'default',
  }),
)
const [PaymentButton] = Object.values(
  import.meta.glob<ComponentType<{ onClick?: () => void }>>(
    '/src/pages/reservation-confirmation/components/payment-button.tsx',
    { eager: true, import: 'default' },
  ),
)

const reservationCardTrainTypes: TrainType[] = [
  'ktx',
  'itx-cheongchun',
  'itx-saemaeul',
  'mugunghwa',
]

const ReservationConfirmationExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!ReservationTitle && !ReservationNotice && !ReservationCard && !PaymentButton) {
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
      {ReservationCard && (
        <ExampleCard heading='h4' title='단건 예약카드'>
          <div className='flex w-full flex-col gap-4'>
            {reservationCardTrainTypes.map((trainType) => (
              <ReservationCard
                key={trainType}
                trainType={trainType}
                trainNumber='001'
                departureTime='05:13'
                departureStation='서울'
                arrivalTime='07:50'
                arrivalStation='부산'
                duration='2시간 37분'
                stopStation='서대구정차'
                seat='일반실 17호차 10A'
                paymentDeadline='2026.10.19(월) 22:43'
              />
            ))}
          </div>
        </ExampleCard>
      )}
      {PaymentButton && (
        <ExampleCard heading='h4' title='결제하기 버튼'>
          <PaymentButton onClick={() => onAction('결제하기')} />
        </ExampleCard>
      )}
    </>
  )
}

export default ReservationConfirmationExamples
