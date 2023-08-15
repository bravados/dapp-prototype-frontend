import { useTheme } from '@mui/material';
import { styled } from '@stitches/react';
import Link from 'next/link';
import { Fragment } from 'react';

const WithLink = (href: string, children: React.ReactNode) => {
  return <Link href={href}>{children}</Link>;
};

const Container = styled('div', {});

type Props = {
  href?: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: Props) => {
  const theme = useTheme();

  return (
    <Container style={{ color: theme.palette.secondary.main }}>
      {href ? WithLink(href, children) : children}
    </Container>
  );
};

export { CustomLink };
