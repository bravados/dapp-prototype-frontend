import { Fragment } from 'react';

type Props = {
  isSignedIn: boolean;
  isMintButtonVisible: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
};

const NearButtons = ({
  isSignedIn,
  isMintButtonVisible,
  onSignIn,
  onSignOut,
}: Props) => {
  return (
    <Fragment>
      {!isSignedIn && <button onClick={onSignIn}>Sign In</button>}
      {isSignedIn && <button onClick={onSignOut}>Sign Out</button>}
      {isSignedIn && isMintButtonVisible && <button>Mint</button>}
    </Fragment>
  );
};

export { NearButtons };
