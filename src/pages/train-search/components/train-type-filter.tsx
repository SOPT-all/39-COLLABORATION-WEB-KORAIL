import TrainLogo from '@/pages/train-search/components/train-logo'

const trainTypeOptions = [
  { value: 'mugunghwa', label: '무궁화', widthClassName: 'w-[59px]' },
  { value: 'ktx', label: 'KTX', widthClassName: 'w-[60px]' },
  { value: 'itx-cheongchun', label: 'ITX-청춘', widthClassName: 'w-[61px]' },
  { value: 'itx-saemaeul', label: 'ITX-새마을', widthClassName: 'w-[73px]' },
] as const

export type TrainType = 'all' | (typeof trainTypeOptions)[number]['value']

interface TrainTypeFilterProps {
  selectedTrainType: TrainType
  onTrainTypeChange: (trainType: TrainType) => void
}

const TrainTypeFilter = ({ selectedTrainType, onTrainTypeChange }: TrainTypeFilterProps) => {
  return (
    <div
      aria-label='열차 종류 필터'
      className='mx-auto flex h-[30px] w-full max-w-[343px] [scrollbar-width:none] items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden'
      role='group'
    >
      <button
        aria-pressed={selectedTrainType === 'all'}
        className={`flex h-[30px] w-[54px] shrink-0 items-center justify-center gap-[10px] rounded-full px-4 ${selectedTrainType === 'all' ? 'bg-gray-0 text-label-12-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]' : 'bg-slate-50 text-label-12-m text-gray-600 ring-1 ring-slate-100 ring-inset'}`}
        type='button'
        onClick={() => onTrainTypeChange('all')}
      >
        전체
      </button>

      {trainTypeOptions.map(({ value, label, widthClassName }) => {
        const isSelected = selectedTrainType === value

        return (
          <button
            key={value}
            aria-label={`${label} 열차만 보기`}
            aria-pressed={isSelected}
            className={`flex h-7 shrink-0 items-center justify-center rounded-2xl px-3 ${widthClassName} ${isSelected ? 'bg-gray-0 shadow-[0_0_2px_rgba(0,0,0,0.08)]' : 'bg-slate-50 ring-1 ring-slate-100 ring-inset'}`}
            type='button'
            onClick={() => onTrainTypeChange(value)}
          >
            <TrainLogo isMuted={!isSelected} trainType={value} variant='filter' />
          </button>
        )
      })}
    </div>
  )
}

export default TrainTypeFilter
