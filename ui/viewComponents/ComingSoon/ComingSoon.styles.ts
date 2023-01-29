import { css } from '@infrastructure/style'

export const StyledVideo = css({
    objectFit: 'cover',
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
})

export const StyledContainer = css({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    position: 'absolute',
    top: '25%'

})