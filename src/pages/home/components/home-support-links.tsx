const supportItems = ['예약보관금 반환접수', '통합회원 전환 (SR회원)']

const HomeSupportLinks = () => {
  return (
    <div className='flex w-full justify-between gap-4'>
      {supportItems.map((label) => (
        <span
          key={label}
          className='flex h-[42px] w-[164px] min-w-0 items-center justify-center rounded-8 border border-slate-200 px-[10px] py-3 text-label-12-r whitespace-nowrap text-gray-700'
        >
          {label}
        </span>
      ))}
    </div>
  )
}

export default HomeSupportLinks
