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
      <ActionButton>
        <StyledImg src="/instagram-negative.svg" />
      </ActionButton>
      <ActionButton>
        <StyledImg src="/facebook-negative.svg" />
      </ActionButton>
      <ActionButton>
        <StyledImg src="/linkedin-negative.svg" />
      </ActionButton>
    </Container>
  );
};

export { SocialMedia };
