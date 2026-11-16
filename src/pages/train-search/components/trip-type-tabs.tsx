import type { TripType } from '@/pages/train-search/types/train-search-condition'

interface TripTypeTabsProps {
  selectedTripType: TripType
  onTripTypeChange: (tripType: TripType) => void
}

const tripTypeOptions: { label: string; value: TripType }[] = [
  { label: '편도', value: 'one-way' },
  { label: '왕복', value: 'round-trip' },
]

const TripTypeTabs = ({ selectedTripType, onTripTypeChange }: TripTypeTabsProps) => {
  return (
    <div
      role='tablist'
      aria-label='여정 유형'
      className='flex w-full gap-0.5 rounded-8 bg-slate-50 p-1'
    >
      {tripTypeOptions.map(({ label, value }) => {
        const isSelected = selectedTripType === value

        return (
          <button
            key={value}
            type='button'
            role='tab'
            aria-selected={isSelected}
            className={`h-10 min-w-0 flex-1 rounded-8 px-3 py-1 text-center ${
              isSelected
                ? 'bg-gray-0 text-body-14-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]'
                : 'text-body-14-m text-gray-500'
            }`}
            onClick={() => onTripTypeChange(value)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TripTypeTabs
