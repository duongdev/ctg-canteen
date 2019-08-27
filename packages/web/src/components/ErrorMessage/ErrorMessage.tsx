import { styled } from '@material-ui/core'
import { ERROR_BACKGROUND } from 'theme'

export default styled('div')(({ theme: { spacing, shape, palette } }) => ({
  padding: spacing(1, 2),
  backgroundColor: ERROR_BACKGROUND,
  border: `solid 1px ${palette.error.dark}`,
  borderRadius: shape.borderRadius,
}))
