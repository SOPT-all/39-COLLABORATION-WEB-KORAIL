export type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

export interface TrainResult {
  id: string
  trainType: TrainType
  trainNumber: string
  departureTime: string
  departureStation: string
  arrivalTime: string
  arrivalStation: string
  duration: string
  stopStation?: string
  standardFare: number
  firstClassFare: number
  rewardRate: number
}
