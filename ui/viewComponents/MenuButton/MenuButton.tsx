import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { CustomLink } from '../../core/CustomLink';

type Props = ButtonProps & {
  isSelected?: boolean;
};

const MenuButton = ({ href, isSelected = false, onClick, children }: Props) => {
  return (
    <Button onClick={onClick} disableElevation disableRipple disableFocusRipple>
      <CustomLink href={href}>{children}</CustomLink>
    </Button>
  );
};

export { MenuButton };
