import React, { FC, useState } from 'react'

import Helmet from 'react-helmet'
import DashboardAppBar from './components/DashboardAppBar'
import DashboardDrawer from './components/DashboardDrawer'

const Dashboard: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Helmet
        title="Nhà ăn Chuyên Tiền Giang"
        titleTemplate="%s – Nhà ăn Chuyên Tiền Giang"
      />
      <DashboardAppBar onOpenDrawer={() => setDrawerOpen(true)} />
      <DashboardDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Dashboard
