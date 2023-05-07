import { Typography } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '@ui/core/CustomLink';
import { useRouter } from 'next/router';

const Container = styled('div', {
  position: 'fixed',
  bottom: '0',
  right: '0',
  marginBottom: '6.2vh',
  marginRight: '4vw',
  border: '1px solid',
  borderRadius: '35px',
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '25px',
  paddingRight: '25px',
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
    <Container isSelected={asPath === '/manifesto'}>
      <CustomLink href="/manifesto">
        <Typography>MANIFESTO</Typography>
      </CustomLink>
    </Container>
  );
};

export { ManifestoButton };
