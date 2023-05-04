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
    }
});

export { theme, ThemeProvider }