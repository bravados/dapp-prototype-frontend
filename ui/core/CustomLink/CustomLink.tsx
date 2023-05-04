import Link from 'next/link';
import { Fragment } from 'react';
import { styled } from '@stitches/react';

const StyledLink = styled(Link, {
  color: '#FFFFFF',
});

const withLink = (href: string, children: React.ReactNode) => {
  return <StyledLink href={href}>{children}</StyledLink>;
};

type Props = {
  href?: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: Props) => {
  return <Fragment>{href ? withLink(href, children) : children}</Fragment>;
};

export { CustomLink };
