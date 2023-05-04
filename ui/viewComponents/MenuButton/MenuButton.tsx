import React from 'react';
import { styled } from '@stitches/react';
import { Button, ButtonProps } from '@mui/material';
import { CustomLink } from '../../core/CustomLink';

const StyledButton = styled(Button, {
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

type Props = ButtonProps & {
  isSelected?: boolean;
};

const MenuButton = ({ href, isSelected = false, children }: Props) => {
  return (
    <StyledButton disableElevation disableRipple disableFocusRipple>
      <CustomLink href={href}>{children}</CustomLink>
    </StyledButton>
  );
};

export { MenuButton };
