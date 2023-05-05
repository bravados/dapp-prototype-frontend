import { styled } from '@stitches/react';
import { MenuButton } from '@ui/core';

const StyledImg = styled('img', {
  width: '39px',
  height: '39px',
  marginRight: '1.5vw',
});

const Container = styled('div', {
  position: 'fixed',
  left: '0',
  bottom: '0',
  marginLeft: '4vw',
  marginBottom: '6.2vh',
});

const SocialMedia = () => {
  return (
    <Container>
      <MenuButton>
        <StyledImg src="/instagram-negative.svg" />
      </MenuButton>
      <MenuButton>
        <StyledImg src="/facebook-negative.svg" />
      </MenuButton>
      <MenuButton>
        <StyledImg src="/linkedin-negative.svg" />
      </MenuButton>
    </Container>
  );
};

export { SocialMedia };
