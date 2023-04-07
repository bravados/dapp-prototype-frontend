import Head from 'next/head';
import 'reflect-metadata';
import { Menu } from '@screens/Menu';
import styles from './MainLayout.module.scss';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kiruna Labs</title>
        <meta name="description" content="Curated digital art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Menu />
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
