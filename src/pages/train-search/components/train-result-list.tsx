import type { TrainResult } from '@/pages/train-search/types/train-result'
import TrainResultCard from '@/pages/train-search/components/train-result-card'

interface TrainResultListProps {
  trains: TrainResult[]
  onTrainSelect?: (train: TrainResult) => void
}

const TrainResultList = ({ trains, onTrainSelect }: TrainResultListProps) => {
  if (trains.length === 0) {
    return (
      <p
        role='status'
        className='flex h-[92px] w-full max-w-[343px] items-end justify-center text-body-14-r whitespace-nowrap text-gray-600'
      >
        조회된 열차가 없습니다.
      </p>
    )
  }

  return (
    <ul aria-label='열차 조회 결과' className='flex w-full max-w-[343px] flex-col gap-3'>
      {trains.map((train) => (
        <li key={train.id}>
          <TrainResultCard
            train={train}
            onSelect={onTrainSelect ? () => onTrainSelect(train) : undefined}
          />
        </li>
      ))}
    </ul>
  )
}

export default TrainResultList
