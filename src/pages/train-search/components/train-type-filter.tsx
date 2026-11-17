import ItxCheongchunLogo from '@/pages/train-search/assets/logo-itx-cheongchun.png'
import ItxSaemaeulLogo from '@/pages/train-search/assets/logo-itx-saemaeul.png'
import KtxLogo from '@/pages/train-search/assets/logo-ktx.png'
import MugunghwaLogo from '@/pages/train-search/assets/logo-mugunghwa.png'

const trainTypeOptions = [
  { value: 'mugunghwa', label: '무궁화', logo: MugunghwaLogo },
  { value: 'ktx', label: 'KTX', logo: KtxLogo },
  { value: 'itx-cheongchun', label: 'ITX-청춘', logo: ItxCheongchunLogo },
  { value: 'itx-saemaeul', label: 'ITX-새마을', logo: ItxSaemaeulLogo },
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
        className={`flex h-[30px] shrink-0 items-center justify-center gap-[10px] rounded-full px-4 ${selectedTrainType === 'all' ? 'bg-gray-0 text-label-12-b text-gray-900 shadow-[0_0_2px_rgba(0,0,0,0.08)]' : 'border border-slate-100 bg-slate-50 text-label-12-m text-gray-600'}`}
        type='button'
        onClick={() => onTrainTypeChange('all')}
      >
        전체
      </button>

      {trainTypeOptions.map(({ value, label, logo }) => {
        const isSelected = selectedTrainType === value

        return (
          <button
            key={value}
            aria-label={`${label} 열차만 보기`}
            aria-pressed={isSelected}
            className={`flex h-[30px] shrink-0 items-center justify-center rounded-2xl px-3 ${isSelected ? 'bg-gray-0 shadow-[0_0_2px_rgba(0,0,0,0.08)]' : 'border border-slate-100 bg-slate-50'}`}
            type='button'
            onClick={() => onTrainTypeChange(value)}
          >
            <img
              alt=''
              className={`h-3 w-auto max-w-none ${isSelected ? '' : 'grayscale'}`}
              src={logo}
            />
          </button>
        )
      })}
    </div>
  )
}

export default TrainTypeFilter
