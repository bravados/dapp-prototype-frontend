import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat-Regular',
    }
});

export { theme, ThemeProvider }