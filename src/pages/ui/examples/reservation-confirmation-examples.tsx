import type { ComponentType } from 'react'

import ExampleCard from '../example-card'

const [ReservationCard] = Object.values(
  import.meta.glob<
    ComponentType<{
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

const ReservationConfirmationExamples = () => {
  if (!ReservationCard) {
    return <p className='text-body-14-r text-gray-600'>등록된 예시가 없어요.</p>
  }

  return (
    <ExampleCard heading='h4' title='단건 예약카드'>
      <ReservationCard
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
    </ExampleCard>
  )
}

export default ReservationConfirmationExamples
