import Head from 'next/head';
import 'reflect-metadata';
import { FullLogo } from '@ui/core/FullLogo';
import { SocialMedia } from '@ui/viewComponents/SocialMedia';
import { ActionsContainer } from '@screens/ActionsContainer';
import { ManifestoButton } from '@ui/viewComponents/ManifestoButton';
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

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Head>
        <title>Create NFTs in NEAR ecosystem</title>
        <meta
          name="description"
          content="Prototype of a custom marketplace of NFTs that uses NEAR ecosystem"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Background />
        <FullLogo />
        <ActionsContainer />
        <SocialMedia />
        <ManifestoButton />
        {children}
      </main>
    </div>
  );
};

export { MainLayout };
