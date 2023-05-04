import { styled } from '@stitches/react';
import { Button } from '@mui/material';
import { CustomLink } from '../CustomLink';

const StyledButton = styled(Button, {
  width: '15vw',
  marginTop: '6.2vh',
  marginLeft: '4vw',
  position: 'fixed',
});

const FullLogo = () => {
  return (
    <StyledButton>
      <CustomLink href="/">
        <img src="/full-logo-white-grey.svg" alt="Logo" />
      </CustomLink>
    </StyledButton>
  );
};

export { FullLogo };
