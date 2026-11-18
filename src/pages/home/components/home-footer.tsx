import FooterIsmsPLogo from '@/pages/home/assets/logo-footer-isms-p.svg?react'
import HomeFooterInfo from '@/pages/home/components/home-footer-info'
import HomeFooterPolicy from '@/pages/home/components/home-footer-policy'
import HomeFooterSocial from '@/pages/home/components/home-footer-social'

const HomeFooter = () => {
  return (
    <footer
      aria-label='코레일 이용 안내 및 회사 정보'
      className='min-h-[573px] w-full bg-footer-bg pb-[51px] font-noto-sans-kr'
    >
      <div className='border-b border-footer-divider pt-12 pb-[25px]'>
        <div className='mx-auto w-[263px]'>
          <div className='pl-14'>
            <HomeFooterSocial />
          </div>

          <div className='mt-[26px]'>
            <HomeFooterPolicy />
          </div>
        </div>
      </div>

      <div className='mx-auto mt-8 w-[289px]'>
        <HomeFooterInfo />
      </div>

      <FooterIsmsPLogo
        role='img'
        aria-label='정보보호 및 개인정보보호 관리체계 ISMS-P 인증'
        className='mx-auto mt-10 block'
      />
    </footer>
  )
}

export default HomeFooter
