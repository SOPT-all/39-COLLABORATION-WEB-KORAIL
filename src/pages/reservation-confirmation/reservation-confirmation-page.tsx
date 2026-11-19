import PaymentButton from './components/payment-button'
import ReservationCard from './components/reservation-card'
import ReservationNotice from './components/reservation-notice'
import ReservationTitle from './components/reservation-title'

const pendingReservations = [
  {
    reservationId: 1,
    trainType: 'ktx',
    trainNumber: '001',
    departureTime: '05:13',
    departureStation: '서울',
    arrivalTime: '07:50',
    arrivalStation: '부산',
    duration: '2시간 37분',
    stopStation: '서대구정차',
    seat: '일반실 17호차 10A',
    paymentDeadline: '2026.10.19(월) 22:43',
  },
] as const

const ReservationConfirmationPage = () => {
  return (
    <main className='flex min-h-[calc(100dvh-60px)] flex-col bg-slate-50 px-4 pt-4 pb-8'>
      <ReservationTitle />

      <ul aria-label='결제 대기 예약 목록' className='mt-6 flex flex-col gap-3'>
        {pendingReservations.map(({ reservationId, ...reservation }) => (
          <li key={reservationId}>
            <ReservationCard {...reservation} />
          </li>
        ))}
      </ul>

      <div className='mt-6'>
        <PaymentButton />
      </div>

      <div className='mt-8'>
        <ReservationNotice />
      </div>
    </main>
  )
}

export default ReservationConfirmationPage
