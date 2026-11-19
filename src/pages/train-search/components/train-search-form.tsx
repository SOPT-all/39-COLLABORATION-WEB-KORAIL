import type { FormEvent } from 'react'

import StationSelector from '@/pages/train-search/components/station-selector'
import TravelDatePicker from '@/pages/train-search/components/travel-date-picker'
import TripTypeTabs from '@/pages/train-search/components/trip-type-tabs'
import type {
  TrainSearchCondition,
  TripType,
} from '@/pages/train-search/types/train-search-condition'
import Button from '@/shared/components/button'

interface TrainSearchFormProps {
  condition: TrainSearchCondition
  onSubmit: () => void
  onTripTypeChange: (tripType: TripType) => void
  onStationSwap?: () => void
  onSeoulAreaChange?: (checked: boolean) => void
  onAdjacentStationChange?: (checked: boolean) => void
}

interface ConditionFieldProps {
  label: string
  value: string
}

interface StationOptionProps {
  label: string
  isChecked: boolean
  onChange?: (checked: boolean) => void
}

const ConditionField = ({ label, value }: ConditionFieldProps) => {
  return (
    <div className='flex h-14 min-w-0 flex-1 items-center rounded-8 bg-slate-50 p-2 text-left'>
      <span className='flex min-w-0 flex-1 flex-col items-start gap-1 overflow-hidden'>
        <span className='w-full text-label-12-r text-gray-600'>{label}</span>
        <strong className='w-full truncate text-body-14-m text-gray-900'>{value}</strong>
      </span>
    </div>
  )
}

const StationOption = ({ label, isChecked, onChange }: StationOptionProps) => {
  return (
    <label className='flex h-5 cursor-pointer items-center gap-1'>
      <span className='relative flex size-5 shrink-0 items-center justify-center'>
        <input
          checked={isChecked}
          className='peer sr-only'
          onChange={(event) => onChange?.(event.target.checked)}
          type='checkbox'
        />
        <span
          aria-hidden='true'
          className={`relative size-3.5 rounded-[2px] border-[1.154px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500 ${
            isChecked
              ? "border-blue-500 bg-blue-500 after:absolute after:top-[1px] after:left-[4px] after:h-[7px] after:w-[4px] after:rotate-45 after:border-r-[1.5px] after:border-b-[1.5px] after:border-gray-0 after:content-['']"
              : 'border-slate-300 bg-gray-0'
          }`}
        />
      </span>

      <span className='text-caption-10-r whitespace-nowrap text-gray-700'>{label}</span>
    </label>
  )
}

const TrainSearchForm = ({
  condition,
  onSubmit,
  onTripTypeChange,
  onStationSwap,
  onSeoulAreaChange,
  onAdjacentStationChange,
}: TrainSearchFormProps) => {
  const {
    tripType,
    dateLabel,
    timeLabel,
    departureStation,
    arrivalStation,
    seatGradeLabel,
    passengerLabel,
    isSeoulAreaIncluded,
    isAdjacentStationIncluded,
  } = condition

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      aria-label='열차 조회 조건'
      className='flex w-full max-w-[343px] flex-col gap-4 rounded-12 bg-gray-0 p-4 shadow-[0_0_2px_rgba(0,0,0,0.08)]'
      onSubmit={handleSubmit}
    >
      <TripTypeTabs selectedTripType={tripType} onTripTypeChange={onTripTypeChange} />

      <div className='flex w-full flex-col gap-2'>
        <TravelDatePicker dateLabel={dateLabel} timeLabel={timeLabel} />
        <StationSelector
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          onSwap={onStationSwap}
        />
      </div>

      <div className='flex w-full items-center gap-[9px]'>
        <ConditionField label='좌석등급' value={seatGradeLabel} />
        <ConditionField label='인원' value={passengerLabel} />
      </div>

      <div className='flex w-full flex-col items-start'>
        <StationOption
          label='서울·용산·수서 함께 보기'
          isChecked={isSeoulAreaIncluded}
          onChange={onSeoulAreaChange}
        />
        <StationOption
          label='인접역 포함하기'
          isChecked={isAdjacentStationIncluded}
          onChange={onAdjacentStationChange}
        />
      </div>

      <Button type='submit' className='max-w-full' variant='primary' width={311}>
        열차 조회하기
      </Button>
    </form>
  )
}

export default TrainSearchForm
