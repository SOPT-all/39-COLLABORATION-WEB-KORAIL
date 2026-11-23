export type ScheduleTrainType = 'KTX' | 'ITX' | 'ITX_CHEONGCHUN' | 'MUGUNGHWA'

export type SeatClass = 'STANDARD' | 'FIRST'

export interface GetSchedulesParams {
  departureStation?: string
  arrivalStation?: string
  departureDate?: string
  passengerCount?: number
  trainTypes?: ScheduleTrainType[]
}

export interface FareResponse {
  seatClass: SeatClass
  unitPrice: number
  totalPrice: number
}

export interface ScheduleResponse {
  scheduleId: number
  trainNumber: string
  trainType: ScheduleTrainType
  trainTypeName: string
  departureAt: string
  arrivalAt: string
  durationMinutes: number
  remark: string | null
  fares: FareResponse[]
}

export interface ScheduleListResponse {
  passengerCount: number
  schedules: ScheduleResponse[]
}

export interface ScheduleDetailResponse extends ScheduleResponse {
  passengerCount: number
}
