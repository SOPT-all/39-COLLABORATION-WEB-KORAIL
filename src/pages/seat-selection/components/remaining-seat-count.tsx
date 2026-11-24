interface RemainingSeatCountProps {
  remainingSeatCount: number
  totalSeatCount: number
  variant: 'trigger' | 'sheet'
}

const RemainingSeatCount = ({
  remainingSeatCount,
  totalSeatCount,
  variant,
}: RemainingSeatCountProps) => {
  const isSheet = variant === 'sheet'
  const isSoldOut = remainingSeatCount === 0

  return (
    <span
      className={`flex h-6 shrink-0 items-center gap-0.5 text-body-14-r whitespace-nowrap ${
        isSoldOut ? 'text-gray-400' : 'text-gray-900'
      }`}
    >
      <span className={isSheet ? 'min-w-[26px]' : undefined}>잔여</span>
      <span
        className={`${isSheet ? 'min-w-7 text-right' : ''} ${
          isSoldOut ? '' : 'text-body-14-b text-blue-500'
        }`}
      >
        {remainingSeatCount}석
      </span>
      <span className={isSheet ? 'min-w-1 text-center' : 'min-w-1.5 text-center'}>/</span>
      <span className={isSheet ? 'min-w-7' : undefined}>{totalSeatCount}석</span>
    </span>
  )
}

export default RemainingSeatCount
