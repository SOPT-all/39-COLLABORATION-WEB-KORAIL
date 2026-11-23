import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type { GetSchedulesParams, ScheduleListResponse } from '@/pages/train-search/types/schedule'

const createScheduleSearchParams = ({
  departureStation,
  arrivalStation,
  departureDate,
  passengerCount,
  trainTypes,
}: GetSchedulesParams) => {
  const searchParams = new URLSearchParams()

  if (departureStation) searchParams.set('departureStation', departureStation)
  if (arrivalStation) searchParams.set('arrivalStation', arrivalStation)
  if (departureDate) searchParams.set('departureDate', departureDate)
  if (passengerCount) searchParams.set('passengerCount', String(passengerCount))
  trainTypes?.forEach((trainType) => searchParams.append('trainTypes', trainType))

  return searchParams
}

export const getSchedules = async (
  params: GetSchedulesParams = {},
): Promise<ScheduleListResponse> => {
  const response = await apiClient.get<ApiResponse<ScheduleListResponse>>('/api/v1/schedules', {
    params: createScheduleSearchParams(params),
  })

  return response.data.result
}
