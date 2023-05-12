import { Fragment } from 'react';
import { ActionButton } from '@ui/core/ActionButton';
import { MenuItem } from '@mui/material';

type Props = {
  isMintButtonVisible: boolean;
  isMintButtonSelected: boolean;
  onSignOut: () => void;
};

const NearMenuItems = ({
  isMintButtonVisible,
  isMintButtonSelected,
  onSignOut,
}: Props) => {
  return (
    <Fragment>
      {isMintButtonVisible && (
        <MenuItem>
          <ActionButton href="/mint/near" isSelected={isMintButtonSelected}>
            Mint
          </ActionButton>
        </MenuItem>
      )}

      <MenuItem><ActionButton onClick={onSignOut}>Sign Out</ActionButton></MenuItem>
    </Fragment>
  );
};

export { NearMenuItems };
