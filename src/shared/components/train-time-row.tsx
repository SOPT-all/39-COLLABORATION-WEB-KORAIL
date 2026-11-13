interface TrainTimeRowProps {
  departureTime: string
  departureStation: string
  arrivalTime: string
  arrivalStation: string
  duration: string
  stopStation?: string
}

const TrainTimeRow = ({
  departureTime,
  departureStation,
  arrivalTime,
  arrivalStation,
  duration,
  stopStation,
}: TrainTimeRowProps) => {
  return (
    <div className='flex w-full items-center justify-between px-2'>
      <div className='flex flex-col items-end px-1 whitespace-nowrap text-gray-900'>
        <time className='text-heading-16-b'>{departureTime}</time>
        <span className='text-label-12-m'>{departureStation}</span>
      </div>
      <div className='flex min-w-0 flex-1 flex-col items-center gap-2 px-3'>
        <div className='flex w-full flex-col gap-1'>
          <span className='text-center text-label-12-m text-gray-600'>{duration}</span>
          <span aria-hidden='true' className='relative h-px w-full bg-slate-300'>
            <span className='absolute -top-0.5 right-px size-[5px] rotate-45 border-t border-r border-slate-300' />
          </span>
        </div>
        {stopStation && (
          <span className='rounded-full bg-slate-100 px-2.5 py-0.5 text-caption-10-m whitespace-nowrap text-gray-600'>
            {stopStation}
          </span>
        )}
      </div>
      <div className='flex flex-col items-start px-1 whitespace-nowrap text-gray-900'>
        <time className='text-heading-16-b'>{arrivalTime}</time>
        <span className='text-label-12-m'>{arrivalStation}</span>
      </div>
    </div>
  )
}

export default TrainTimeRow
