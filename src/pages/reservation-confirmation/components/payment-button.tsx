import Button from '@/shared/components/button'

interface PaymentButtonProps {
  onClick?: () => void
}

const PaymentButton = ({ onClick }: PaymentButtonProps) => {
  return (
    <Button className='mx-auto max-w-full' width={343} onClick={onClick}>
      결제하기
    </Button>
  )
}

export default PaymentButton
