import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '../../ui/core/CustomLink';

const StyledButton = styled(Button, {
  variants: {
    isSelected: {
      true: {
        fontWeight: 'bold',
      },
      false: {
        fontWeight: 'normal',
      },
    },
  },
});

type Props = ButtonProps & {
  isSelected?: boolean;
};

const MenuButton = ({ href, isSelected = false, onClick, children }: Props) => {
  return (
    <StyledButton
      isSelected={isSelected}
      onClick={onClick}
      disableElevation
      disableRipple
      disableFocusRipple
    >
      <CustomLink href={href}>{children}</CustomLink>
    </StyledButton>
  );
};

export { MenuButton };
