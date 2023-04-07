import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import Link from 'next/link';

const withLink = (href: string, children: React.ReactNode) => {
  return <Link href={href}>{children}</Link>;
};

type MenuButtonProps = ButtonProps & {
  href?: string;
  isSelected?: boolean;
  children: React.ReactNode;
};

const MenuButton = ({
  href,
  isSelected = false,
  onClick,
  children,
}: MenuButtonProps) => {
  const variant = isSelected ? 'contained' : 'outlined';

  return (
    <Button onClick={onClick} variant={variant}>
      {href ? withLink(href, children) : children}
    </Button>
  );
};

export { MenuButton };
