import ReservationLookupIcon from '@/pages/home/assets/icon-reservation-lookup.svg?react'
import TicketCheckIcon from '@/pages/home/assets/icon-ticket-check.svg?react'

const HomeTicketShortcuts = () => {
  return (
    <section className='flex w-full flex-col gap-4'>
      <h2 className='text-body-14-b text-gray-900'>내 승차권</h2>

      <div className='grid grid-cols-[minmax(0,171px)_1px_minmax(0,171px)] items-center rounded-8 bg-gray-0'>
        <div className='flex min-w-0 flex-col items-center gap-2 py-4 text-label-12-m text-gray-900'>
          <TicketCheckIcon aria-hidden='true' focusable='false' className='shrink-0' />
          <span className='whitespace-nowrap'>승차권 확인</span>
        </div>

        <span aria-hidden='true' className='h-[52px] w-px bg-gray-200' />

        <div className='flex min-w-0 flex-col items-center gap-2 py-4 text-label-12-m text-gray-900'>
          <ReservationLookupIcon aria-hidden='true' focusable='false' className='shrink-0' />
          <span className='whitespace-nowrap'>예약승차권 조회/취소</span>
        </div>
      </div>
    </section>
  )
}

export default HomeTicketShortcuts
