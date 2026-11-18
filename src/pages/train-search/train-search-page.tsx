import { useState } from 'react'
import { useNavigate } from 'react-router'

import NextDaySearchButton from '@/pages/train-search/components/next-day-search-button'
import TrainDetailSheet from '@/pages/train-search/components/train-detail-sheet'
import TrainResultList from '@/pages/train-search/components/train-result-list'
import TrainSearchForm from '@/pages/train-search/components/train-search-form'
import TrainTypeFilter, {
  type TrainType as TrainFilterType,
} from '@/pages/train-search/components/train-type-filter'
import type { TrainDetailInfo, TrainFareOption } from '@/pages/train-search/types/train-detail'
import type { TrainResult } from '@/pages/train-search/types/train-result'
import type {
  TrainSearchCondition,
  TripType,
} from '@/pages/train-search/types/train-search-condition'

const initialSearchCondition: TrainSearchCondition = {
  tripType: 'round-trip',
  dateLabel: '10.26 (월)',
  timeLabel: '01:00 이후',
  departureStation: '서울',
  arrivalStation: '부산',
  seatGradeLabel: '전체',
  passengerLabel: '어른 1명',
  isSeoulAreaIncluded: false,
  isAdjacentStationIncluded: false,
}

const trainResults: TrainResult[] = [
  {
    id: 'itx-cheongchun-001',
    trainType: 'itx-cheongchun',
    trainNumber: '001',
    departureTime: '05:13',
    departureStation: '서울',
    arrivalTime: '07:50',
    arrivalStation: '부산',
    duration: '2시간 37분',
    stopStation: '서대구정차',
    standardFare: 78400,
    firstClassFare: 78400,
    rewardRate: 5,
  },
  {
    id: 'itx-cheongchun-002',
    trainType: 'itx-cheongchun',
    trainNumber: '001',
    departureTime: '05:13',
    departureStation: '서울',
    arrivalTime: '07:50',
    arrivalStation: '부산',
    duration: '2시간 37분',
    stopStation: '서대구정차',
    standardFare: 78400,
    firstClassFare: 78400,
    rewardRate: 5,
  },
  {
    id: 'mugunghwa-001',
    trainType: 'mugunghwa',
    trainNumber: '001',
    departureTime: '05:13',
    departureStation: '서울',
    arrivalTime: '07:50',
    arrivalStation: '부산',
    duration: '2시간 37분',
    stopStation: '서대구정차',
    standardFare: 78400,
    firstClassFare: 78400,
    rewardRate: 5,
  },
]

const getTrainDetail = (train: TrainResult, departureDate: string): TrainDetailInfo => ({
  trainType: train.trainType,
  trainNumber: train.trainNumber,
  departureDate,
  departureTime: train.departureTime,
  departureStation: train.departureStation,
  arrivalTime: train.arrivalTime,
  arrivalStation: train.arrivalStation,
  duration: train.duration,
  stopStation: train.stopStation,
})

const getStandardFare = (train: TrainResult): TrainFareOption => ({
  seatGrade: 'standard',
  label: '일반실',
  price: train.standardFare,
})

const TrainSearchPage = () => {
  const navigate = useNavigate()
  const [searchCondition, setSearchCondition] =
    useState<TrainSearchCondition>(initialSearchCondition)
  const [selectedTrainType, setSelectedTrainType] = useState<TrainFilterType>('all')
  const [selectedTrain, setSelectedTrain] = useState<TrainResult | null>(null)

  const filteredTrains =
    selectedTrainType === 'all'
      ? trainResults
      : trainResults.filter(({ trainType }) => trainType === selectedTrainType)

  const handleSearchSubmit = () => {
    setSelectedTrainType('all')
    setSelectedTrain(null)
  }

  const handleTripTypeChange = (tripType: TripType) => {
    setSearchCondition((condition) => ({ ...condition, tripType }))
    setSelectedTrain(null)
  }

  const handleTrainTypeChange = (trainType: TrainFilterType) => {
    setSelectedTrainType(trainType)
    setSelectedTrain(null)
  }

  const handleNextDaySearch = () => {
    setSearchCondition((condition) => ({
      ...condition,
      dateLabel: '10.27 (화)',
      timeLabel: '00:00 이후',
    }))
    setSelectedTrainType('all')
    setSelectedTrain(null)
  }

  const handleSeatSelect = () => {
    if (!selectedTrain) return

    navigate(`/seat-selection/${selectedTrain.id}`)
  }

  const handleReservation = () => {
    navigate('/reservation-confirmation')
  }

  return (
    <main className='min-h-[calc(100dvh-60px)] bg-slate-50 px-4'>
      <h1 className='sr-only'>열차 조회</h1>

      <div className='mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-[343px] flex-col'>
        <div className='flex flex-col gap-4 pb-6'>
          <TrainSearchForm
            condition={searchCondition}
            onSubmit={handleSearchSubmit}
            onTripTypeChange={handleTripTypeChange}
          />

          <TrainTypeFilter
            selectedTrainType={selectedTrainType}
            onTrainTypeChange={handleTrainTypeChange}
          />

          <TrainResultList trains={filteredTrains} onTrainSelect={setSelectedTrain} />
        </div>

        <div className='mt-auto pt-4 pb-14'>
          <NextDaySearchButton nextDateLabel='10.27 (화)' onClick={handleNextDaySearch} />
        </div>
      </div>

      {selectedTrain && (
        <TrainDetailSheet
          open
          train={getTrainDetail(selectedTrain, searchCondition.dateLabel)}
          fareOption={getStandardFare(selectedTrain)}
          passengerSummary={`${searchCondition.passengerLabel} 기준`}
          onClose={() => setSelectedTrain(null)}
          onReservationClick={handleReservation}
          onSeatSelectClick={handleSeatSelect}
        />
      )}
    </main>
  )
}

export default TrainSearchPage
