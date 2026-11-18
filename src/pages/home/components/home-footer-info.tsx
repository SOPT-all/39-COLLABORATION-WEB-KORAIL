import FooterChevronDownIcon from '@/pages/home/assets/icon-footer-chevron-down.svg?react'

const FooterInfoDivider = () => {
  return (
    <span aria-hidden='true' className='flex h-6 w-4 shrink-0 items-center justify-center'>
      <span className='h-[10px] border-l border-footer-info' />
    </span>
  )
}

const HomeFooterInfo = () => {
  return (
    <div className='flex w-full flex-col items-center gap-px'>
      <div className='flex w-full flex-col items-center gap-[14px] pb-6'>
        <div className='flex w-full flex-col items-center gap-px text-body-14-r text-footer-info'>
          <p className='flex h-6 items-center whitespace-nowrap'>
            <span>상호 : 한국철도공사</span>
            <FooterInfoDivider />
            <span className='font-arial'>사업자등록 : 314-82-10024</span>
            <FooterInfoDivider />
          </p>

          <p className='flex h-6 items-center whitespace-nowrap'>
            <span>통신판매업신고 : 대전 동구 - 0233호</span>
          </p>

          <p className='flex h-6 items-center whitespace-nowrap'>
            <span className='font-arial'>34618 대전광역시 동구 중앙로 240</span>
            <FooterInfoDivider />
          </p>

          <p className='flex h-6 items-center whitespace-nowrap'>
            <span className='font-arial'>대표전화 : 1588-7788</span>
            <FooterInfoDivider />
            <span className='font-arial'>팩스번호 02-361-8385</span>
          </p>
        </div>

        <p className='w-[249px] text-center text-body-13-r whitespace-nowrap text-footer-copyright'>
          COPYRIGHT(C) KOREA RAILROAD. ALL RIGHTS
          <br />
          RESERVED.
        </p>
      </div>

      <div className='flex h-7 w-[120px] items-center gap-[5px] rounded-[16px] border border-gray-0 py-px pr-2 pl-4 text-body-14-r text-gray-0'>
        <span className='shrink-0'>관련 사이트</span>
        <FooterChevronDownIcon aria-hidden='true' className='shrink-0' />
      </div>
    </div>
  )
}

export default HomeFooterInfo
