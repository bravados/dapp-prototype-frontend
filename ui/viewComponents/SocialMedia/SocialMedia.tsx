import { styled } from '@stitches/react';
import { ActionButton } from '@ui/core';

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
  zIndex: 1,
});

const SocialMedia = () => {
  return (
    <Container>
      <ActionButton href="https://www.linkedin.com/in/fjmh89/">
        <StyledImg src="/linkedin-negative.svg" />
      </ActionButton>
      <ActionButton href="https://github.com/bravados?tab=repositories&q=dapp">
        <StyledImg src="/github-negative.png" />
      </ActionButton>
    </Container>
  );
};

export { SocialMedia };
