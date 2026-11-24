import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'

export interface CoachResponse {
  coachId: number
  coachNumber: number
  remainingSeatCount: number
  totalSeatCount: number
  reservable: boolean
}

export interface CoachListResponse {
  scheduleId: number
  seatClass: 'STANDARD' | 'FIRST'
  coaches: CoachResponse[]
}

export const getCoaches = async (scheduleId: number) => {
  const { data } = await apiClient.get<ApiResponse<CoachListResponse>>(
    `/api/v1/schedules/${scheduleId}/coaches`,
    {
      params: {
        seatClass: 'STANDARD',
      },
    },
  )

  return data.result
}
