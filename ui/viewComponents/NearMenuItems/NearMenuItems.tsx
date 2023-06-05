import { Fragment } from 'react';
import { ActionButton } from '@ui/core/ActionButton';
import { MenuItem } from '@mui/material';

type Props = {
  isMintButtonVisible: boolean;
  isDepositFundButtonVisible: boolean;
  isWithdrawFundButtonVisible: boolean;
  isMintButtonSelected: boolean;
  onWithdrawFund: () => void;
  onSignOut: () => void;
};

const NearMenuItems = ({
  isMintButtonVisible,
  isDepositFundButtonVisible,
  isWithdrawFundButtonVisible,
  isMintButtonSelected,
  onWithdrawFund,
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

      {isDepositFundButtonVisible && (
        <MenuItem>
          <ActionButton href="/fund/near">Fund account</ActionButton>
        </MenuItem>
      )}

      {isWithdrawFundButtonVisible && (
        <MenuItem>
          <ActionButton onClick={onWithdrawFund}>Withdraw funds</ActionButton>
        </MenuItem>
      )}

      <MenuItem>
        <ActionButton onClick={onSignOut}>Sign Out</ActionButton>
      </MenuItem>
    </Fragment>
  );
};

export { NearMenuItems };
