import ExternalLinkIcon from '@/shared/assets/icon-external-link.svg?react'

const HomeExternalLinks = () => {
  return (
    <div className='flex w-full items-center justify-end gap-1 text-label-12-r text-gray-700'>
      <span className='inline-flex items-center whitespace-nowrap'>
        한국철도
        <ExternalLinkIcon aria-hidden='true' focusable='false' />
      </span>

      <span aria-hidden='true' className='h-[7px] w-px shrink-0 bg-gray-400' />

      <span className='inline-flex items-center whitespace-nowrap'>
        기차여행
        <ExternalLinkIcon aria-hidden='true' focusable='false' />
      </span>
    </div>
  )
}

export default HomeExternalLinks
