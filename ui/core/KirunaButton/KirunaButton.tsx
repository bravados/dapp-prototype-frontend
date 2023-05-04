import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';

const withLink = (href: string, children: React.ReactNode) => {
  return <Link href={href}>{children}</Link>;
};

type Props = ButtonProps & {
  href?: string;
  isSelected?: boolean;
  children: React.ReactNode;
};

const KirunaButton = ({
  href,
  isSelected = false,
  onClick,
  children,
}: Props) => {
  const fontWeight = isSelected ? 'bold' : 'normal';

  return (
    <Button
      onClick={onClick}
      variant={'text'}
      style={{ fontWeight: fontWeight }}
      disableRipple
    >
      {href ? withLink(href, children) : children}
    </Button>
  );
};

export { KirunaButton };
export type { Props };
