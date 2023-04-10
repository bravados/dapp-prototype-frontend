import type { AppProps } from 'next/app';
import 'reflect-metadata';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCssAndReset, theme, ThemeProvider } from '@infrastructure/style';
import { NearProvider } from '@infrastructure/blockchain/near';
import { KirunalabsProvider } from '@screens/KirunalabsContext';
import '../styles/globals.css';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  getCssAndReset();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <NearProvider>
          <KirunalabsProvider>
            <Component {...pageProps} />
          </KirunalabsProvider>
        </NearProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
