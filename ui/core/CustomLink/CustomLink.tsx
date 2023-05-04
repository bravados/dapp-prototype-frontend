import Link from 'next/link';
import { Fragment } from 'react';

const withLink = (href: string, children: React.ReactNode) => {
  return <Link href={href}>{children}</Link>;
};

type Props = {
  href?: string;
  children: React.ReactNode;
};

const CustomLink = ({ href, children }: Props) => {
  return <Fragment>{href ? withLink(href, children) : children}</Fragment>;
};

export { CustomLink };
