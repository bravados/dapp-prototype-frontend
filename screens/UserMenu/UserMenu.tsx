import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNear } from '@infrastructure/blockchain/near';
import { useCreateUser, useGetKirunalabsUser } from '@application/user';
import { NearMenuItems } from '@ui/viewComponents/NearMenuItems';
import { useKirunalabs } from 'screens/KirunalabsContext';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { ActionButton } from '@ui/core';

type Props = {
  isUserConfirmed: boolean;
  onUserChanged: (newUser: boolean) => void;
};

const UserMenu = ({ isUserConfirmed, onUserChanged }: Props) => {
  // UI logic
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Business logic
  const { user, setUser, deleteUser } = useKirunalabs();

  const { isSignedIn, signOut, storageWithdraw, address } = useNear();

  const [
    requestExistingUser,
    { error: requestExistingUserError, data: existingUser },
  ] = useGetKirunalabsUser();

  const {
    user: newUser,
    request: requestCreateUser,
    error: createUserError,
  } = useCreateUser({
    blockchain: 'NEAR',
    address: address!,
  });

  const { asPath } = useRouter();

  // request existing user only once
  useEffect(() => {
    if (
      isSignedIn &&
      address &&
      requestExistingUser &&
      !existingUser &&
      !requestExistingUserError
    ) {
      requestExistingUser({ blockchain: 'NEAR', address });
    }
  }, [isSignedIn, requestExistingUser, existingUser, requestExistingUserError]);

  // set user if existing user is found
  useEffect(() => {
    if (existingUser && (!user || existingUser?.avatar !== user?.avatar)) {
      setUser(existingUser);
    }
  }, [existingUser, user, setUser]);

  // show terms and conditions if user is not found
  useEffect(() => {
    if (requestExistingUserError && requestExistingUserError.status === 404) {
      onUserChanged(true);
    }
  }, [requestExistingUserError]);

  // set user if new user is created
  useEffect(() => {
    if (newUser && !user) {
      setUser(newUser);
      onUserChanged(false);
    } else {
      if (createUserError) {
        console.error(createUserError);
      }
    }
  }, [newUser, createUserError, setUser]);

  // create the user if the user accepts the terms and conditions
  useEffect(() => {
    if (isUserConfirmed) {
      requestCreateUser();
    }
  }, [isUserConfirmed]);

  const onSignOut = () => {
    setAnchorEl(null);
    signOut();
    deleteUser();
  };

  const onStorageWithdraw = () => {
    storageWithdraw({ callbackUrl: window.location.href });
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <img src={user?.avatar} width={32} />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ActionButton href={`/users/profile/edit`}>Profile</ActionButton>
        </MenuItem>
        <Divider />
        <NearMenuItems
          isMintButtonVisible={user?.type === 'ARTIST'}
          isDepositFundButtonVisible={true}
          isWithdrawFundButtonVisible={true}
          isMintButtonSelected={asPath === '/mint/near'}
          onWithdrawFund={onStorageWithdraw}
          onSignOut={onSignOut}
        />
      </Menu>
    </Fragment>
  );
};

export { UserMenu };
