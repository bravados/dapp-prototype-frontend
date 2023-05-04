import { BlockchainButtons } from '@screens/BlockchainButtons';
import { MenuButton } from '@ui/core';
import { styled } from '@stitches/react';

const Container = styled('div', {
  position: 'absolute',
  marginTop: '6.2vh',
  right: 0,
  marginRight: '4vw',
});

const ActionsContainer = () => {
  return (
    <Container>
      <MenuButton>About us</MenuButton>
      <MenuButton>Artworks</MenuButton>
      <MenuButton>Contacts</MenuButton>
      <BlockchainButtons />
    </Container>
  );
};

export { ActionsContainer };
