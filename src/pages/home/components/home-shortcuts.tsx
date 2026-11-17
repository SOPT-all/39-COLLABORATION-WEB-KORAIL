import HomeGuideShortcuts from '@/pages/home/components/home-guide-shortcuts'
import HomeSupportLinks from '@/pages/home/components/home-support-links'
import HomeTicketShortcuts from '@/pages/home/components/home-ticket-shortcuts'

const HomeShortcuts = () => {
  return (
    <div className='flex w-full max-w-[344px] flex-col gap-6 bg-slate-50'>
      <HomeTicketShortcuts />
      <HomeGuideShortcuts />
      <HomeSupportLinks />
    </div>
  )
}

export default HomeShortcuts
