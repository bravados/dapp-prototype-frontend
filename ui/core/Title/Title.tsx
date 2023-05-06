import { Typography } from '@mui/material';
import { styled } from '@stitches/react';

const StyledTypography = styled(Typography, {
  position: 'relative',
  marginBottom: '5.4vh',
});

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return <StyledTypography variant="h3">{children}</StyledTypography>;
};

export { Title };
