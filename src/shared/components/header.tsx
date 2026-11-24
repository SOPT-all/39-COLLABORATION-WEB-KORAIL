import MenuIcon from '@/shared/assets/icon-menu.svg?react'
import KorailLogo from '@/shared/assets/logo-korail.svg?react'

const Header = () => {
  return (
    <header className='flex h-[60px] w-full items-center justify-between bg-slate-50 px-[6px] py-2'>
      <div className='flex h-11 w-[190px] shrink-0 items-center gap-[5px] p-2.5'>
        <KorailLogo className='h-6 w-[99.4px] shrink-0' />

        <span className='text-korail-body-13-b whitespace-nowrap text-gray-900'>승차권예매</span>
      </div>

      <div className='flex size-11 shrink-0 items-center justify-center p-2.5'>
        <MenuIcon className='h-[15px] w-5' />
      </div>
    </header>
  )
}

export default Header
