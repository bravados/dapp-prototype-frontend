import { Button, ButtonProps } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '@ui/core/CustomLink';
import { useRouter } from 'next/router';

const StyledButton = styled(Button, {
  position: 'fixed',
  minWidth: '10vw',
  height: '4.8vh',
  bottom: '0',
  right: '0',
  marginBottom: '6.2vh',
  marginRight: '4vw',
  border: '1px solid',
  borderRadius: '27px',
  paddingTop: '18px',
  paddingBottom: '18px',
  paddingLeft: '30px',
  paddingRight: '30px',
  fontSize: '20px',
  fontWeight: 'bold',
  variants: {
    isSelected: {
      true: {
        borderColor: '#4F4F4F',
        backgroundColor: '#313131',
      },
      false: {
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
      },
    },
  },
  zIndex: 1,
});

const ManifestoButton = () => {
  const { asPath } = useRouter();

  return (
    <StyledButton isSelected={asPath === '/manifesto'}>
      <CustomLink href="/manifesto">MANIFESTO</CustomLink>
    </StyledButton>
  );
};

export { ManifestoButton };
