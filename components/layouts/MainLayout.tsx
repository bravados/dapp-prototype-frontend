import Head from 'next/head';
import 'reflect-metadata';
import { FullLogo } from '@ui/core/FullLogo';
import { SocialMedia } from '@ui/viewComponents/SocialMedia';
import styles from './MainLayout.module.scss';
import { ActionsContainer } from '@ui/viewComponents/ActionsContainer';
import { Manifesto } from '@ui/viewComponents/Manifesto';

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
        <FullLogo />
        <ActionsContainer />
        <SocialMedia />
        <Manifesto />
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
