import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'

export type ReservationStatus = 'PENDING' | 'PAID' | 'CANCELED' | 'EXPIRED'
export type ServerTrainType = 'KTX' | 'ITX' | 'ITX_CHEONGCHUN' | 'MUGUNGHWA'
export type SeatClass = 'STANDARD' | 'FIRST'

export interface ReservationFare {
  seatClass: SeatClass
  unitPrice: number
  totalPrice: number
}

export interface ReservationSchedule {
  scheduleId: number
  trainNumber: string
  trainType: ServerTrainType
  trainTypeName: string
  departureStationName: string
  arrivalStationName: string
  departureAt: string
  arrivalAt: string
  durationMinutes: number
  remark: string
  fares: ReservationFare[]
}

export interface ReservationTicket {
  ticketId: number
  coachNumber: number
  seatClass: SeatClass
  seatId: number
  seatNumber: string
  direction: 'FORWARD' | 'BACKWARD'
  passengerType: string
  price: number
}

export interface ReservationDetailResponse {
  reservationId: number
  status: ReservationStatus
  totalPrice: number
  expiresAt: string
  createdAt: string
  schedule: ReservationSchedule
  tickets: ReservationTicket[]
}

export const getReservationDetail = async (reservationId: number) => {
  const { data } = await apiClient.get<ApiResponse<ReservationDetailResponse>>(
    `/api/v1/reservations/${reservationId}`,
    { headers: { 'Member-Id': '1' } },
  )

  if (!data.isSuccess || !data.result) {
    throw new Error(data.message || '예약 상세 응답을 확인하지 못했습니다.')
  }

  return data.result
}
