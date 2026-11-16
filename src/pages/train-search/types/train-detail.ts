export type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

export interface TrainDetailInfo {
  trainType: TrainType
  trainNumber: string
  departureDate: string
  departureTime: string
  departureStation: string
  arrivalTime: string
  arrivalStation: string
  duration: string
  stopStation?: string
}
