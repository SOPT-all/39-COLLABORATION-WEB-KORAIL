import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'

import type { Seat } from '../components/seat-grid'

export interface SeatLayoutResponse {
  scheduleId: number
  coachId: number
  coachNumber: number
  seatClass: 'STANDARD' | 'FIRST'
  remainingSeatCount: number
  totalSeatCount: number
  seats: Seat[]
}

export const getSeatLayout = async (scheduleId: number, coachId: number) => {
  const { data } = await apiClient.get<ApiResponse<SeatLayoutResponse>>(
    `/api/v1/schedules/${scheduleId}/coaches/${coachId}/seats`,
  )

  return data.result
}
