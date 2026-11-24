import Button from '@/shared/components/button'

interface NextDaySearchButtonProps {
  nextDateLabel: string
  onClick?: () => void
}

const NextDaySearchButton = ({ nextDateLabel, onClick }: NextDaySearchButtonProps) => {
  return (
    <Button className='mx-auto max-w-full' variant='nextDayOutline' width={343} onClick={onClick}>
      다음날 {nextDateLabel} 조회
    </Button>
  )
}

export default NextDaySearchButton
