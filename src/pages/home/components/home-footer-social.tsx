import FooterBlogIcon from '@/pages/home/assets/icon-footer-blog.svg?react'
import FooterFacebookIcon from '@/pages/home/assets/icon-footer-facebook.svg?react'
import FooterInstagramIcon from '@/pages/home/assets/icon-footer-instagram.svg?react'
import FooterXIcon from '@/pages/home/assets/icon-footer-x.svg?react'
import FooterYoutubeIcon from '@/pages/home/assets/icon-footer-youtube.svg?react'

const SOCIAL_ITEMS = [
  { label: '유튜브', Icon: FooterYoutubeIcon },
  { label: '페이스북', Icon: FooterFacebookIcon },
  { label: '인스타그램', Icon: FooterInstagramIcon },
  { label: '블로그', Icon: FooterBlogIcon },
  { label: 'X', Icon: FooterXIcon },
]

const HomeFooterSocial = () => {
  return (
    <ul aria-label='코레일 소셜 미디어' className='flex items-center gap-[15px]'>
      {SOCIAL_ITEMS.map(({ label, Icon }) => (
        <li key={label} className='shrink-0'>
          <Icon role='img' aria-label={label} className='block' />
        </li>
      ))}
    </ul>
  )
}

export default HomeFooterSocial
