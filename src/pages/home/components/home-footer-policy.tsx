const FooterPolicyDivider = () => {
  return (
    <span aria-hidden='true' className='flex size-6 shrink-0 items-center justify-center'>
      <span className='size-[3px] bg-gray-0' />
    </span>
  )
}
// 글자 사이 큰 점

const HomeFooterPolicy = () => {
  return (
    <ul
      aria-label='이용 안내'
      className='flex w-[243px] flex-col gap-px text-body-13-m text-gray-0'
    >
      <li className='flex h-6 items-center whitespace-nowrap'>
        <span>이용약관</span>
        <FooterPolicyDivider />
        <span>여객운송약관 및 부속약관</span>
      </li>

      <li className='flex h-6 items-center whitespace-nowrap'>
        <span className='text-footer-highlight'>개인정보처리방침</span>
        <FooterPolicyDivider />
        <span>이메일무단수집거부</span>
        <FooterPolicyDivider />
      </li>

      <li className='flex h-6 items-center whitespace-nowrap'>
        <span>저작권정책</span>
        <FooterPolicyDivider />
        <span>지원브라우저안내</span>
      </li>
    </ul>
  )
}

export default HomeFooterPolicy
