import ChevronLeftIcon from '@/shared/assets/icon-chevron-left.svg'
import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg'

interface TravelDatePickerProps {
  dateLabel: string
  timeLabel: string
}

const TravelDatePicker = ({ dateLabel, timeLabel }: TravelDatePickerProps) => {
  return (
    <div
      aria-label={`가는 날 ${dateLabel} ${timeLabel}`}
      className='flex h-[54px] w-full items-center justify-between overflow-hidden rounded-8 border border-gray-100 px-1 py-2'
    >
      <span
        aria-hidden='true'
        className='flex size-10 shrink-0 items-center justify-center px-[6px] py-1'
      >
        <img alt='' aria-hidden='true' height={24} src={ChevronLeftIcon} width={24} />
      </span>

      <div className='flex h-10 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden'>
        <span className='text-label-12-r text-gray-500'>가는 날</span>
        <span className='flex max-w-full items-center justify-center gap-1 text-heading-16-b whitespace-nowrap text-gray-900'>
          <span>{dateLabel}</span>
          <span aria-hidden='true'>·</span>
          <span>{timeLabel}</span>
        </span>
      </div>

      <span
        aria-hidden='true'
        className='flex size-10 shrink-0 items-center justify-center px-[6px] py-1'
      >
        <img alt='' aria-hidden='true' height={24} src={ChevronRightIcon} width={24} />
      </span>
    </div>
  )
}

export default TravelDatePicker
