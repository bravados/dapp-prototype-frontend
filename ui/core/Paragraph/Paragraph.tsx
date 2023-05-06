import { Typography } from '@mui/material';
import { styled } from '@stitches/react';

const StyledTypography = styled(Typography, {
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
    <StyledTypography variant="body1" textAlign={'center'}>
      {children}
    </StyledTypography>
  );
};

export { Paragraph };
