import LegendSeatIcon from '../assets/legend-seat.svg?react'

const legendItems = [
  { label: '순방향', iconClassName: '-scale-y-100 text-slate-400' },
  { label: '역방향', iconClassName: 'text-blue-300' },
  { label: '선택불가', iconClassName: '-scale-y-100 text-gray-200' },
]

const SeatLegend = () => (
  <ul
    aria-label='좌석 범례'
    className='flex h-[49px] items-center justify-center gap-2 rounded-12 bg-gray-0 shadow-[0_0_1px_#00000014]'
  >
    {legendItems.map(({ label, iconClassName }) => (
      <li key={label} className='flex items-center gap-1 text-label-12-r whitespace-nowrap'>
        <LegendSeatIcon aria-hidden='true' className={`shrink-0 ${iconClassName}`} />
        <span className='w-11 text-gray-900'>{label}</span>
      </li>
    ))}
  </ul>
)

export default SeatLegend
