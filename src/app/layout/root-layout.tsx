import { Outlet } from 'react-router'

import Header from '@/shared/components/header'

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RootLayout
