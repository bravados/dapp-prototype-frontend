import { Fragment, useEffect, useState } from 'react';
import { useNearContext } from '@infrastructure/blockchain/near';
import { useKirunalabsContext } from 'screens/KirunalabsContext';
import { useGetUser } from 'application/user/getUser.usecase';
import { TermsAndConditions } from 'ui/viewComponents';
import { useCreateUser } from 'application/user/createUser.usecase';
import { NearButtons } from 'ui/viewComponents/NearButtons';

const Menu = () => {
  const { user, setUser } = useKirunalabsContext();

  const { isSignedIn, signIn, signOut, address } = useNearContext();

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

  const [isSignedInNear, setIsSignedInNear] = useState(isSignedIn());

  const [isTermsAndConditionsVisible, setIsTermsAndConditionsVisible] =
    useState(false);

  useEffect(() => {
    setIsSignedInNear(isSignedIn());
  }, [isSignedIn]);

  // request existing user only once
  useEffect(() => {
    if (
      isSignedInNear &&
      requestExistingUser &&
      !existingUser &&
      !requestExistingUserError
    ) {
      requestExistingUser();
    }
  }, [
    isSignedInNear,
    requestExistingUser,
    existingUser,
    requestExistingUserError,
  ]);

  // set user if existing user is found
  useEffect(() => {
    if (existingUser && existingUser.id != user?.id) {
      setUser(existingUser);
    }
  }, [existingUser, user, setUser]);

  // show terms and conditions if user is not found
  useEffect(() => {
    if (requestExistingUserError) {
      if (requestExistingUserError?.status === 404)
        setIsTermsAndConditionsVisible(true);
      else console.error(requestExistingUserError);
    }
  }, [requestExistingUserError]);

  // set user if new user is created
  useEffect(() => {
    if (newUser && newUser.id != user?.id) {
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
    setIsSignedInNear(false);
  };

  const onAcceptTermsAndConditions = () => {
    requestCreateUser();
  };

  const onRejectTermsAndConditions = () => {
    console.log('Terms and conditions rejected');
  };

  return (
    <Fragment>
      <NearButtons
        isSignedIn={isSignedInNear}
        isMintButtonVisible={user?.type === 'ARTIST'}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <TermsAndConditions
        isVisible={isTermsAndConditionsVisible}
        onAccept={onAcceptTermsAndConditions}
        onReject={onRejectTermsAndConditions}
      />
    </Fragment>
  );
};

export { Menu };
