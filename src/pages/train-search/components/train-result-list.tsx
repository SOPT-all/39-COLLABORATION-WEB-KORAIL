import type { TrainResult } from '@/pages/train-search/types/train-result'
import EmptyTrainResult from '@/pages/train-search/components/empty-train-result'
import TrainResultCard from '@/pages/train-search/components/train-result-card'

interface TrainResultListProps {
  trains: TrainResult[]
  onTrainSelect?: (train: TrainResult) => void
}

const TrainResultList = ({ trains, onTrainSelect }: TrainResultListProps) => {
  if (trains.length === 0) {
    return <EmptyTrainResult />
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
