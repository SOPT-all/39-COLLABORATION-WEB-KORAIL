export type TrainType = 'itx-cheongchun' | 'itx-saemaeul' | 'ktx' | 'mugunghwa'

export type TrainSeatGrade = 'first-class' | 'standard'

export interface TrainFareOption {
  seatGrade: TrainSeatGrade
  label: string
  price: number
}

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
