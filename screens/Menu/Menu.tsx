import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useNear } from '@infrastructure/blockchain/near';
import { useCreateUser, useGetUser } from '@application/user';
import { TermsAndConditions } from 'ui/viewComponents';
import { NearButtons } from 'ui/viewComponents/NearButtons';
import { useKirunalabs } from 'screens/KirunalabsContext';

const Menu = () => {
  const { user, setUser, deleteUser } = useKirunalabs();

  const { isSignedIn, signIn, signOut, address } = useNear();

  const {
    user: existingUser,
    request: requestExistingUser,
    error: requestExistingUserError,
  } = useGetUser('NEAR', address!);

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
      requestExistingUser &&
      !existingUser &&
      !requestExistingUserError
    ) {
      requestExistingUser();
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

  const onSignIn = () => {
    signIn();
  };

  const onSignOut = () => {
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
    <div className="navbar-container">
      <NearButtons
        isSignedIn={isSignedIn}
        isMintButtonVisible={user?.type === 'ARTIST'}
        isMintButtonSelected={asPath === '/mint/near'}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <TermsAndConditions
        isVisible={isTermsAndConditionsVisible}
        onAccept={onAcceptTermsAndConditions}
        onReject={onRejectTermsAndConditions}
      />
    </div>
  );
};

export { Menu };
