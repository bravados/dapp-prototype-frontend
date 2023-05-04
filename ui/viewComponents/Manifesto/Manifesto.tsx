import { Button } from '@mui/material';
import { styled } from '@stitches/react';

// todo why can't I use KirunaButton here? css is not applied
const StyledButton = styled(Button, {
  position: 'absolute',
  width: '10vw',
  height: '4.8vh',
  bottom: '0',
  right: '0',
  marginBottom: '6.2vh',
  marginRight: '4vw',
  border: '1px solid',
  borderRadius: '27px',
  borderColor: '#FFFFFF',
  paddingTop: '18px',
  paddingBottom: '18px',
  paddingLeft: '30px',
  paddingRight: '30px',
  fontSize: '20px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const Manifesto = () => {
  return <StyledButton>MANIFESTO</StyledButton>;
};

export { Manifesto };
