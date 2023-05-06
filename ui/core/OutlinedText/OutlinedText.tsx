import { Typography } from '@mui/material';

type OutlinedTextProps = {
  children: React.ReactNode;
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'inherit';
};

const OutlinedText = ({ textAlign, children }: OutlinedTextProps) => {
  return (
    <Typography
      style={{
        textAlign: textAlign,
        fontSize: '128px',
        WebkitTextStroke: '4px #B3B3B3',
        color: 'transparent',
        fontWeight: 'normal',
      }}
    >
      {children}
    </Typography>
  );
};

export { OutlinedText };
