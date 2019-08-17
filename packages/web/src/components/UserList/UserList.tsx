import React, { FC, useCallback, useState } from 'react'

import { makeStyles } from '@material-ui/core'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import ContentContainer from 'components/shared/ContentContainer'
import { AdapterLink } from 'components/shared/LinkButton'
import PageTitle from 'components/shared/PageTitle'
import { AccountPlus, CloudUpload } from 'mdi-material-ui'

const UserList: FC = (props) => {
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  const handleToggle = useCallback(() => setOpen(!open), [open])

  return (
    <>
      <ContentContainer>
        <PageTitle title="Danh sách người dùng" />
      </ContentContainer>

      <SpeedDial
        ariaLabel="User list"
        open={open}
        onBlur={handleClose}
        onClick={handleToggle}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        icon={<SpeedDialIcon />}
        className={classes.speedDial}
      >
        <SpeedDialAction
          icon={<AccountPlus />}
          tooltipTitle="Tạo người dùng mới"
          tooltipOpen
          ButtonProps={
            {
              component: AdapterLink,
              to: '/dashboard/users/create',
            } as any
          }
        />
        <SpeedDialAction
          tooltipOpen
          icon={<CloudUpload />}
          tooltipTitle="Import từ file"
          ButtonProps={
            {
              component: AdapterLink,
              to: '/dashboard/users/import',
            } as any
          }
        />
      </SpeedDial>
    </>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  speedDial: {
    position: 'fixed',
    bottom: spacing(2),
    right: spacing(3),
  },
}))

export default UserList
