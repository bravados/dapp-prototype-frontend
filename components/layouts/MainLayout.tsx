import Head from 'next/head';
import 'reflect-metadata';
import { FullLogo } from '@ui/core/FullLogo';
import { SocialMedia } from '@ui/viewComponents/SocialMedia';
import styles from './MainLayout.module.scss';
import { ActionsContainer } from '@screens/ActionsContainer';
import { ManifestoButton } from '@ui/viewComponents/ManifestoButton';
import { Hidden } from '@mui/material';
import { styled } from '@stitches/react';

const Background = styled('div', {
  backgroundColor: '#000000',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'fixed',
  zIndex: -1,
});

const TopBar = () => {
  const StyledDiv = styled('div', {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '22vh',
    backgroundColor: '#000000',
  });
  return (
    <Hidden mdUp>
      <StyledDiv />
    </Hidden>
  );
};

const BottomBar = () => {
  const StyledDiv = styled('div', {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: '22vh',
    backgroundColor: '#000000',
  });
  return (
    <Hidden mdUp>
      <StyledDiv />
    </Hidden>
  );
};

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
        <Background />
        <TopBar />
        <FullLogo />
        <ActionsContainer />
        <BottomBar />
        <SocialMedia />
        <ManifestoButton />
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
