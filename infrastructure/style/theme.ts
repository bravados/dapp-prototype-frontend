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
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#D9D9D9',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'regular',
      color: '#888888',
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
    secondary: {
      main: '#0F0F0F',
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
          textDecoration: 'none',
          textTransform: 'none',
          ":hover": {
            backgroundColor: 'transparent',
          },
          fontSize: 24,
          fontWeight: 'normal',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0F0F0F',
        }
      }
    },
  },
});

export { theme, ThemeProvider }