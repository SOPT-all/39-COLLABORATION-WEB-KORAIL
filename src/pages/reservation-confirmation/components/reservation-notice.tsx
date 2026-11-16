import NoticeToggleIcon from '@/shared/assets/icon-notice-toggle.svg?react'

const ReservationNotice = () => {
  return (
    <button
      type='button'
      aria-expanded='false'
      className='flex w-full items-center justify-between rounded-8 border border-slate-100 bg-gray-0 px-5 py-4'
    >
      <span className='text-heading-16-b text-gray-900'>안내</span>
      <NoticeToggleIcon aria-hidden='true' className='shrink-0' />
    </button>
  )
}

export default ReservationNotice
