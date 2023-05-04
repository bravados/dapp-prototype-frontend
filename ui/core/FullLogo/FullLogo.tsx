import { styled } from '@stitches/react';
import { Button } from '@mui/material';

const StyledButton = styled(Button, {
  width: '15vw',
  marginTop: '6.2vh',
  marginLeft: '4vw',
  position: 'fixed',
});

const FullLogo = () => {
  return (
    <StyledButton>
      <img src="/full-logo-white-grey.svg" alt="Logo" />
    </StyledButton>
  );
};

export { FullLogo };
