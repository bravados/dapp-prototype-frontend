import { styled } from '@stitches/react';
import { Typography } from '@mui/material';
import { CustomLink } from '../CustomLink';

const Container = styled('div', {
  width: '15vw',
  marginTop: '6.2vh',
  marginLeft: '4vw',
  position: 'fixed',
  zIndex: 1,
});

const LogoPlaceholder = styled('div', {
  width: '250px',
  height: '50px',
  textAlign: 'center',
});

const FullLogo = () => {
  return (
    <Container>
      <CustomLink href="/">
        <LogoPlaceholder>
          <img src="/logo-placeholder.png" width={250} />
        </LogoPlaceholder>
      </CustomLink>
    </Container>
  );
};

export { FullLogo };
