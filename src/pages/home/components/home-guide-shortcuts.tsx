import CustomerServiceIcon from '@/pages/home/assets/icon-customer-service.svg?react'
import FaqIcon from '@/pages/home/assets/icon-faq.svg?react'
import LuggageIcon from '@/pages/home/assets/icon-luggage.svg?react'
import RefundIcon from '@/pages/home/assets/icon-refund.svg?react'
import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg?react'

const guideItems = [
  { id: 'customer-service', label: '고객센터', Icon: CustomerServiceIcon },
  { id: 'faq', label: '자주 찾는 질문 (FAQ)', Icon: FaqIcon },
  { id: 'refund', label: '승차권 환불 위약금', Icon: RefundIcon },
  { id: 'luggage', label: '열차 내 물품 휴대 기준', Icon: LuggageIcon },
]

const HomeGuideShortcuts = () => {
  return (
    <section className='flex w-full flex-col gap-4'>
      <h2 className='text-body-14-b text-gray-900'>이용 안내</h2>

      <ul className='overflow-hidden rounded-8 bg-gray-0'>
        {guideItems.map(({ id, label, Icon }) => (
          <li key={id} className='flex items-center px-4 py-3'>
            <div className='flex min-w-0 flex-1 items-center gap-4'>
              <Icon aria-hidden='true' focusable='false' className='shrink-0' />
              <span className='text-label-12-m whitespace-nowrap text-gray-900'>{label}</span>
            </div>

            <ChevronRightIcon aria-hidden='true' focusable='false' className='shrink-0' />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HomeGuideShortcuts
