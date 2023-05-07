import { Typography } from '@mui/material';
import { styled } from '@stitches/react';

const Container = styled('div', {
  position: 'relative',
  left: '0',
  marginLeft: '16.4vw',
  marginRight: '16.4vw',
  marginBottom: '2.9vh',
});

type Props = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: Props) => {
  return (
    <Container>
      <Typography variant="body1" textAlign={'center'}>
        {children}
      </Typography>
    </Container>
  );
};

export { Paragraph };
