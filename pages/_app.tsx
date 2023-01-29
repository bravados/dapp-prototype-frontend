import type { AppProps } from 'next/app'
import { getCssAndReset, theme, ThemeProvider } from '@infrastructure/style';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    getCssAndReset();

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
