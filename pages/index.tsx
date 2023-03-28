import Head from 'next/head';
import 'reflect-metadata';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from '../styles/Home.module.css';
import { Menu } from 'screens/Menu';
import { KirunalabsContextProvider } from 'screens/KirunalabsContext';
import { NearContextProvider } from '@infrastructure/blockchain/near';

const client = new QueryClient();

export default function Home() {
  return (
    <>
      <Head>
        <title>Kiruna Labs</title>
        <meta name="description" content="Curated digital art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <ComingSoon/> */}
        <KirunalabsContextProvider>
          <QueryClientProvider client={client}>
            <NearContextProvider>
              <Menu />
            </NearContextProvider>
          </QueryClientProvider>
        </KirunalabsContextProvider>
      </main>
    </>
  );
}
