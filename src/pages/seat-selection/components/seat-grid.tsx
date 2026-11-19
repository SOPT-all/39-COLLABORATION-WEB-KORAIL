import aisleArrow from '../assets/aisle-arrow.svg'
import SeatButton from './seat-button'
import SeatLegend from './seat-legend'

export interface Seat {
  seatId: number
  seatNumber: string
  row: number
  column: string
  direction: 'FORWARD' | 'BACKWARD'
  available: boolean
}

interface SeatGridProps {
  seats: Seat[]
  selectedSeatId: number | null
  departureStation: string
  arrivalStation: string
  onSeatChange: (seatId: number | null) => void
}

const columns = ['D', 'C', 'aisle', 'B', 'A'] as const

const SeatGrid = ({
  seats,
  selectedSeatId,
  departureStation,
  arrivalStation,
  onSeatChange,
}: SeatGridProps) => {
  const rows = [...new Set(seats.map(({ row }) => row))].sort((a, b) => a - b)
  const seatsByPosition = new Map(seats.map((seat) => [`${seat.row}:${seat.column}`, seat]))
  const rowGroups = [rows.filter((row) => row <= 8), rows.filter((row) => row > 8)].filter(
    (group) => group.length > 0,
  )

  return (
    <section aria-label='좌석 배치' className='mx-auto w-full max-w-[375px] px-4'>
      <SeatLegend />

      <div className='mt-2 rounded-12 bg-gray-0 py-[34px] shadow-[0_0_1px_#00000014]'>
        <div className='mx-auto flex w-[270px] flex-col gap-[52px]'>
          {rowGroups.map((group, groupIndex) => {
            const firstGroup = groupIndex === 0
            const lastGroup = groupIndex === rowGroups.length - 1
            const firstArrowTop = firstGroup ? 73 : 7
            const groupHeight = group.length * 66 - 12
            const arrowCount = Math.max(
              0,
              Math.floor((groupHeight - firstArrowTop - (lastGroup ? 54 : 0) - 12) / 42) + 1,
            )

            return (
              <div key={group[0]} className='relative flex flex-col gap-3'>
                {firstGroup && (
                  <span className='absolute top-[7px] left-[108px] w-[54px] truncate text-center text-heading-16-b text-gray-400'>
                    {arrivalStation}
                  </span>
                )}
                {lastGroup && (
                  <span className='absolute bottom-px left-[108px] w-[54px] truncate text-center text-heading-16-b text-gray-400'>
                    {departureStation}
                  </span>
                )}

                {Array.from({ length: arrowCount }, (_, index) => {
                  const top = firstArrowTop + index * 42

                  return (
                    <img
                      key={top}
                      alt=''
                      src={aisleArrow}
                      className='pointer-events-none absolute left-1/2 -translate-x-1/2'
                      style={{ top }}
                    />
                  )
                })}

                {group.map((row) => (
                  <div key={row} className='grid grid-cols-5'>
                    {columns.map((column) => {
                      const seat = seatsByPosition.get(`${row}:${column}`)

                      if (!seat) {
                        return <span key={column} aria-hidden='true' className='size-[54px]' />
                      }

                      const selected = seat.available && seat.seatId === selectedSeatId

                      return (
                        <SeatButton
                          key={seat.seatId}
                          seatNumber={seat.seatNumber}
                          forward={seat.direction === 'FORWARD'}
                          available={seat.available}
                          selected={selected}
                          onClick={() => onSeatChange(selected ? null : seat.seatId)}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SeatGrid
