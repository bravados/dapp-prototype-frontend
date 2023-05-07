import { Typography } from '@mui/material';
import { styled } from '@stitches/react';

const Container = styled('div', {
  position: 'relative',
  marginBottom: '5.4vh',
});

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return (
    <Container>
      <Typography variant="h3">{children}</Typography>
    </Container>
  );
};

export { Title };
