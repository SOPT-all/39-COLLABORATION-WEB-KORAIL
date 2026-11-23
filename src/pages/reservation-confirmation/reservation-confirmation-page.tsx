import type { ComponentProps } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import {
  getReservationDetail,
  type ReservationDetailResponse,
  type ServerTrainType,
} from './api/get-reservation-detail'
import PaymentButton from './components/payment-button'
import ReservationCard from './components/reservation-card'
import ReservationNotice from './components/reservation-notice'
import ReservationTitle from './components/reservation-title'

type ReservationCardProps = ComponentProps<typeof ReservationCard>

const trainTypeMap: Record<ServerTrainType, ReservationCardProps['trainType']> = {
  KTX: 'ktx',
  ITX: 'itx-saemaeul',
  ITX_CHEONGCHUN: 'itx-cheongchun',
  MUGUNGHWA: 'mugunghwa',
}

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

// 서버 시각 문자열(2026-12-01T09:10:00)을 시간대 변환 없이 그대로 사용
const formatTime = (dateTime: string) => dateTime.slice(11, 16)

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const restMinutes = minutes % 60

  if (hours === 0) return `${restMinutes}분`
  if (restMinutes === 0) return `${hours}시간`
  return `${hours}시간 ${restMinutes}분`
}

const formatPaymentDeadline = (dateTime: string) => {
  const [year, month, day] = dateTime.slice(0, 10).split('-').map(Number)
  const weekday = weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]

  return `${dateTime.slice(0, 10).replaceAll('-', '.')}(${weekday}) ${formatTime(dateTime)}`
}

const toReservationCardProps = ({
  schedule,
  tickets,
  expiresAt,
}: ReservationDetailResponse): ReservationCardProps => {
  const [ticket] = tickets

  return {
    trainType: trainTypeMap[schedule.trainType],
    trainNumber: schedule.trainNumber,
    departureTime: formatTime(schedule.departureAt),
    departureStation: schedule.departureStationName,
    arrivalTime: formatTime(schedule.arrivalAt),
    arrivalStation: schedule.arrivalStationName,
    duration: formatDuration(schedule.durationMinutes),
    stopStation: schedule.remark || undefined,
    seat: `${ticket.seatClass === 'FIRST' ? '특실' : '일반실'} ${ticket.coachNumber}호차 ${ticket.seatNumber}`,
    paymentDeadline: formatPaymentDeadline(expiresAt),
  }
}

const parseReservationId = (value: string | null) => {
  const reservationId = Number(value)

  return Number.isSafeInteger(reservationId) && reservationId > 0 ? reservationId : null
}

const ReservationStatusMessage = ({ message }: { message: string }) => (
  <p className='mt-6 text-body-14-r text-gray-600' role='status'>
    {message}
  </p>
)

const ReservationContent = ({ reservationId }: { reservationId: number }) => {
  const {
    data: reservation,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['reservation', reservationId],
    queryFn: () => getReservationDetail(reservationId),
  })

  if (isError) {
    return <ReservationStatusMessage message='예약 정보를 불러오지 못했습니다.' />
  }

  if (isPending) {
    return <ReservationStatusMessage message='예약 정보를 불러오는 중입니다.' />
  }

  if (reservation.status !== 'PENDING' || reservation.tickets.length === 0) {
    return <ReservationStatusMessage message='결제 대기 중인 예약이 없습니다.' />
  }

  return (
    <>
      <div className='mt-6'>
        <ReservationCard {...toReservationCardProps(reservation)} />
      </div>

      <div className='mt-6'>
        <PaymentButton />
      </div>
    </>
  )
}

const ReservationConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const reservationId = parseReservationId(searchParams.get('reservationId'))

  return (
    <main className='flex min-h-[calc(100dvh-60px)] flex-col bg-slate-50 px-4 pt-4 pb-8'>
      <ReservationTitle />

      {reservationId ? (
        <ReservationContent reservationId={reservationId} />
      ) : (
        <ReservationStatusMessage message='결제 대기 중인 예약이 없습니다.' />
      )}

      <div className='mt-8'>
        <ReservationNotice />
      </div>
    </main>
  )
}

export default ReservationConfirmationPage
