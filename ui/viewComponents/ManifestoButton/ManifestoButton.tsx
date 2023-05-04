import { Button, ButtonProps } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '@ui/core/CustomLink';

const StyledButton = styled(Button, {
  position: 'fixed',
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

type Props = ButtonProps & {
  isSelected?: boolean;
};

const ManifestoButton = ({ href, isSelected }: Props) => {
  return (
    <StyledButton disableElevation disableFocusRipple disableRipple>
      <CustomLink href={href}>MANIFESTO</CustomLink>
    </StyledButton>
  );
};

export { ManifestoButton };
