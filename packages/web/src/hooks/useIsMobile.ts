import { useMediaQuery, useTheme } from '@material-ui/core'

const useIsMobile = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  return isMobile
}

export default useIsMobile
