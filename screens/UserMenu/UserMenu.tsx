import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useNear } from '@infrastructure/blockchain/near';
import { useCreateUser, useGetUser } from '@application/user';
import { TermsAndConditions } from 'ui/viewComponents';
import { NearMenuItems } from '@ui/viewComponents/NearMenuItems';
import { useKirunalabs } from 'screens/KirunalabsContext';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { ActionButton } from '@ui/core';

const UserMenu = () => {
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

  const { isSignedIn, signOut, address } = useNear();

  const [
    requestExistingUser,
    { error: requestExistingUserError, data: existingUser },
  ] = useGetUser();

  const {
    user: newUser,
    request: requestCreateUser,
    error: createUserError,
  } = useCreateUser({
    blockchain: 'NEAR',
    address: address!,
  });

  const [isTermsAndConditionsVisible, setIsTermsAndConditionsVisible] =
    useState(false);

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
      setIsTermsAndConditionsVisible(true);
    }
  }, [requestExistingUserError]);

  // set user if new user is created
  useEffect(() => {
    if (newUser) {
      setUser(newUser);
      setIsTermsAndConditionsVisible(false);
    } else {
      if (createUserError) {
        console.error(createUserError);
      }
    }
  }, [newUser, createUserError, user, setUser]);

  const onSignOut = () => {
    setAnchorEl(null);
    signOut();
    deleteUser();
  };

  const onAcceptTermsAndConditions = () => {
    requestCreateUser();
  };

  const onRejectTermsAndConditions = () => {
    console.log('Terms and conditions rejected');
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
          <ActionButton href={`/users/${user?.id}`}>Profile</ActionButton>
        </MenuItem>
        <Divider />
        <NearMenuItems
          isMintButtonVisible={user?.type === 'ARTIST'}
          isMintButtonSelected={asPath === '/mint/near'}
          onSignOut={onSignOut}
        />

        <TermsAndConditions
          isVisible={isTermsAndConditionsVisible}
          onAccept={onAcceptTermsAndConditions}
          onReject={onRejectTermsAndConditions}
        />
      </Menu>
    </Fragment>
  );
};

export { UserMenu };
