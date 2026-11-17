import type { TripType } from '@/pages/train-search/types/train-search-condition'

interface TripTypeTabsProps {
  selectedTripType: TripType
}

const tripTypeOptions: { label: string; value: TripType }[] = [
  { label: '편도', value: 'one-way' },
  { label: '왕복', value: 'round-trip' },
]

const TripTypeTabs = ({ selectedTripType }: TripTypeTabsProps) => {
  return (
    <div aria-label='여정 유형' className='flex w-full gap-0.5 rounded-8 bg-slate-50 p-1'>
      {tripTypeOptions.map(({ label, value }) => {
        const isSelected = selectedTripType === value

        return (
          <span
            key={value}
            aria-current={isSelected ? 'true' : undefined}
            className={`flex h-10 min-w-0 flex-1 items-center justify-center rounded-8 px-3 py-1 text-center ${
              isSelected
                ? 'bg-gray-0 text-body-14-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]'
                : 'text-body-14-m text-gray-500'
            }`}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}

export default TripTypeTabs
