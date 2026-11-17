import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

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
      onCancelClick?: () => void
      onCartClick?: () => void
    }>
  >('/src/pages/reservation-confirmation/components/reservation-card.tsx', {
    eager: true,
    import: 'default',
  }),
)

const reservationCardTrainTypes: TrainType[] = [
  'ktx',
  'itx-cheongchun',
  'itx-saemaeul',
  'mugunghwa',
]

const ReservationConfirmationExamples = ({ onAction }: { onAction: (action: string) => void }) => {
  if (!ReservationCard) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
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
            onCancelClick={() => onAction('예약취소')}
            onCartClick={() => onAction('장바구니')}
          />
        ))}
      </div>
    </ExampleCard>
  )
}

export default ReservationConfirmationExamples
