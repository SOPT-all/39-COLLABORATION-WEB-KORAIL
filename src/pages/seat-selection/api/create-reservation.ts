import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'

export interface CreateReservationRequest {
  scheduleId: number
  seatClass: 'STANDARD'
  passengerCount: 1
  seatIds: [number]
}

export interface CreateReservationResponse {
  reservationId: number
}

export const createReservation = async (body: CreateReservationRequest) => {
  const { data } = await apiClient.post<ApiResponse<CreateReservationResponse>>(
    '/api/v1/reservations',
    body,
    { headers: { 'Member-Id': '1' } },
  )

  const reservationId = data.result?.reservationId

  if (!data.isSuccess || !Number.isSafeInteger(reservationId) || reservationId <= 0) {
    throw new Error(data.message || '예약 생성 응답을 확인하지 못했습니다.')
  }

  return data.result
}
