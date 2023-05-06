import { Typography } from '@mui/material';

type DescriptionTextProps = {
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
};

const DescriptionText = ({
  textAlign = 'center',
  variant = 'h5',
  children,
}: DescriptionTextProps) => {
  return (
    <Typography
      variant={variant}
      style={{
        textAlign: textAlign,
      }}
    >
      {children}
    </Typography>
  );
};

export { DescriptionText };
