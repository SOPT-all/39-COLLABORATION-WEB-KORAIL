export type TripType = 'one-way' | 'round-trip'

export interface TrainSearchCondition {
  tripType: TripType
  dateLabel: string
  timeLabel: string
  departureStation: string
  arrivalStation: string
  seatGradeLabel: string
  passengerLabel: string
  isSeoulAreaIncluded: boolean
  isAdjacentStationIncluded: boolean
}
