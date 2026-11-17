import GridSeatIcon from '../assets/grid-seat.svg?react'

interface SeatButtonProps {
  seatNumber: string
  forward: boolean
  available: boolean
  selected: boolean
  onClick: () => void
}

const SeatButton = ({ seatNumber, forward, available, selected, onClick }: SeatButtonProps) => {
  let iconColor = forward ? 'text-slate-400' : 'text-blue-300'

  if (!available) {
    iconColor = 'text-gray-200'
  } else if (selected) {
    iconColor = 'text-blue-500'
  }

  return (
    <button
      type='button'
      aria-label={`${seatNumber} 좌석, ${forward ? '순방향' : '역방향'}`}
      aria-pressed={selected}
      disabled={!available}
      onClick={onClick}
      className='relative size-[54px] rounded-8 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed'
    >
      <GridSeatIcon
        aria-hidden='true'
        className={`absolute top-[7px] left-[3px] ${iconColor} ${forward ? '-scale-y-100' : ''}`}
      />
      <span
        className={`absolute left-1/2 -translate-x-1/2 text-label-12-b whitespace-nowrap ${forward ? 'top-[15px]' : 'top-[23px]'} ${available ? 'text-white' : 'text-gray-400'}`}
      >
        {seatNumber}
      </span>
    </button>
  )
}

export default SeatButton
