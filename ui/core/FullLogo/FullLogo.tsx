import { styled } from '@stitches/react';
import { CustomLink } from '../CustomLink';

const Container = styled('div', {
  width: '15vw',
  marginTop: '6.2vh',
  marginLeft: '4vw',
  position: 'fixed',
  zIndex: 1,
});

const FullLogo = () => {
  return (
    <Container>
      <CustomLink href="/">
        <img src="/full-logo-white-grey.svg" alt="Logo" />
      </CustomLink>
    </Container>
  );
};

export { FullLogo };
