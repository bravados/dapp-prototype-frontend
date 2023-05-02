import { Fragment } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  isLoading?: boolean;
  children: React.ReactNode;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  onClick?: (e: any) => void;
} & ButtonProps;

const WaiterButton = ({
  isLoading,
  variant = 'contained',
  color = 'primary',
  onClick,
  children,
  ...rest
}: Props) => {
  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant={variant} color={color} onClick={onClick} {...rest}>
          {children}
        </Button>
      )}
    </Fragment>
  );
};

export { WaiterButton };
