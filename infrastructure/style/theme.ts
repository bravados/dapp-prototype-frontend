import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 24,
    },
    palette: {
        primary: {
            main: '#FFFFFF',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
              // The props to change the default for.
              disableRipple: true, // No more ripple, on the whole application 💣!
            },

        },
        MuiButton: {
            styleOverrides: {
              // Name of the slot
              root: {
                textTransform: 'none',
                ":hover": {
                    backgroundColor: 'transparent',
                }
              },
            },
          },
    },
});

export { theme, ThemeProvider }