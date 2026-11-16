import NoticeToggleIcon from '@/shared/assets/icon-notice-toggle.svg?react'

const ReservationNotice = () => {
  return (
    <section className='flex w-full items-center justify-between rounded-8 border border-slate-100 bg-gray-0 px-5 py-4'>
      <h2 className='text-heading-16-b text-gray-900'>안내</h2>
      <NoticeToggleIcon aria-hidden='true' className='shrink-0' />
    </section>
  )
}

export default ReservationNotice
