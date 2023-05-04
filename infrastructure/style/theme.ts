import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
          fontSize: 48,
          fontWeight: 'bolder',
        },
        h2: {
          fontSize: 48,
          fontWeight: 'bold',
        },
        h3: {
          fontSize: 40,
          fontWeight: 'bold',
        },
        h5: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        body1: {
          fontSize: 20,
          fontWeight: 'normal',
        },
        body2: {
          fontSize: 22,
          fontWeight: 'lighter',
        },
        allVariants: {
          color: '#FFFFFF',
          fontFamily: 'Montserrat-Regular',
        }
    },
    palette: {
        primary: {
            main: '#FFFFFF',
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
              disableRipple: true, // No more ripple, on the whole application 💣!
            },

        },
        MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                ":hover": {
                    backgroundColor: 'transparent',
                },
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
          },
    },
});

export { theme, ThemeProvider }