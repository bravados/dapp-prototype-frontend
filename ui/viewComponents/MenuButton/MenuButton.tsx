import React from 'react';
import Link from 'next/link';
import { styled } from '@stitches/react';
import {
  KirunaButton,
  Props as KirunaButtonProps,
} from '../../core/KirunaButton';

const withLink = (href: string, children: React.ReactNode) => {
  return <Link href={href}>{children}</Link>;
};

const StyledButton = styled(KirunaButton, {
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

type MenuButtonProps = KirunaButtonProps & {
  isSelected?: boolean;
};

const MenuButton = ({
  href,
  isSelected = false,
  children,
}: MenuButtonProps) => {
  return (
    <StyledButton>{href ? withLink(href, children) : children}</StyledButton>
  );
};

export { MenuButton };
