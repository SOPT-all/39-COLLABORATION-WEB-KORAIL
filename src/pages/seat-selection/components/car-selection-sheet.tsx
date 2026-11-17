import BottomSheet from '@/shared/components/bottom-sheet'

export interface CoachOption {
  coachId: number
  coachNumber: number
  remainingSeatCount: number
  totalSeatCount: number
  reservable: boolean
  description?: string
}

interface CarSelectionSheetProps {
  open: boolean
  onClose: () => void
  coaches: readonly CoachOption[]
  onSelectCoach: (coachId: number) => void
}

const CarSelectionSheet = ({ open, onClose, coaches, onSelectCoach }: CarSelectionSheetProps) => (
  <BottomSheet
    open={open}
    onClose={onClose}
    title='호차 선택'
    maxBodyHeight={399}
    bottomPadding={60}
  >
    <ul>
      {coaches.map((coach) => {
        const isSoldOut = coach.remainingSeatCount === 0
        const canSelect =
          coach.coachNumber === 1 && coach.reservable && coach.remainingSeatCount > 0

        return (
          <li key={coach.coachId} className='border-b border-gray-100'>
            <button
              type='button'
              disabled={!canSelect}
              onClick={() => onSelectCoach(coach.coachId)}
              className='flex w-full items-center justify-between gap-2 py-4 pr-2.5 pl-4 text-left'
            >
              <span className='flex min-w-0 flex-col gap-1'>
                <span
                  className={isSoldOut ? 'text-heading-16-r text-gray-300' : 'text-heading-16-b'}
                >
                  일반실 {coach.coachNumber}호차
                </span>
                {coach.description && (
                  <span className='text-label-12-r text-gray-400'>{coach.description}</span>
                )}
              </span>

              <span
                className={`flex h-6 shrink-0 items-center gap-0.5 text-body-14-r whitespace-nowrap ${
                  isSoldOut ? 'text-gray-400' : ''
                }`}
              >
                <span className='min-w-[26px]'>잔여</span>
                <span
                  className={`min-w-7 text-right ${isSoldOut ? '' : 'text-body-14-b text-blue-500'}`}
                >
                  {coach.remainingSeatCount}석
                </span>
                <span className='min-w-1 text-center'>/</span>
                <span className='min-w-7'>{coach.totalSeatCount}석</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  </BottomSheet>
)

export default CarSelectionSheet
