import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type { ScheduleDetailResponse } from '@/pages/train-search/types/schedule'

export const getScheduleDetail = async (
  scheduleId: number,
  passengerCount = 1,
): Promise<ScheduleDetailResponse> => {
  const response = await apiClient.get<ApiResponse<ScheduleDetailResponse>>(
    `/api/v1/schedules/${scheduleId}`,
    { params: { passengerCount } },
  )

  return response.data.result
}
