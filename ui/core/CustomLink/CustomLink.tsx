import { Fragment } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@stitches/react';

const StyledLink = styled('a', {
  textDecoration: 'none',
  color: 'inherit',
});

const WithLink = (href: string, children: React.ReactNode) => {
  return <StyledLink href={href}>{children}</StyledLink>;
};

type Props = {
  href?: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: Props) => {
  return <Fragment>{href ? WithLink(href, children) : children}</Fragment>;
};

export { CustomLink };
