import { useNear } from '@infrastructure/blockchain/near';
import { Fragment } from 'react';

type Props = {
  children: React.ReactNode;
};

const WalletConnectedRoute = ({ children }: Props) => {
  const { isSignedIn } = useNear();
  return (
    <Fragment>{isSignedIn ? children : 'Wallet is not connected'}</Fragment>
  );
};

export { WalletConnectedRoute };
