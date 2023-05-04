import { BlockchainButtons } from '@screens/BlockchainButtons';
import { MenuButton } from '@ui/core';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';

const Container = styled('div', {
  position: 'fixed',
  marginTop: '6.2vh',
  right: 0,
  marginRight: '4vw',
});

const ActionsContainer = () => {
  const { asPath } = useRouter();

  return (
    <Container>
      <MenuButton href="/about-us" isSelected={asPath === '/about-us'}>
        About us
      </MenuButton>
      <MenuButton href="/artworks" isSelected={asPath === '/artworks'}>
        Artworks
      </MenuButton>
      <MenuButton href="/contacts" isSelected={asPath === '/contacts'}>
        Contacts
      </MenuButton>
      <BlockchainButtons />
    </Container>
  );
};

export { ActionsContainer };
