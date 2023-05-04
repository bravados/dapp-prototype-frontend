import { Fragment } from 'react';
import { MenuButton } from '@screens/MenuButton';

type Props = {
  isSignedIn: boolean;
  isMintButtonVisible: boolean;
  isMintButtonSelected: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
};

const NearButtons = ({
  isSignedIn,
  isMintButtonVisible,
  isMintButtonSelected,
  onSignIn,
  onSignOut,
}: Props) => {
  return (
    <Fragment>
      {isSignedIn && isMintButtonVisible && (
        <MenuButton href="/mint/near" isSelected={isMintButtonSelected}>
          Mint
        </MenuButton>
      )}
      {!isSignedIn && <MenuButton onClick={onSignIn}>Sign In</MenuButton>}
      {isSignedIn && <MenuButton onClick={onSignOut}>Sign Out</MenuButton>}
    </Fragment>
  );
};

export { NearButtons };
