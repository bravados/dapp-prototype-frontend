import { useState } from 'react';
import { UserMenu } from '@screens/UserMenu';
import { ActionButton } from '@ui/core';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import { useNear } from '@infrastructure/blockchain/near';
import { TermsAndConditions } from '@ui/viewComponents';

const Container = styled('div', {
  position: 'fixed',
  marginTop: '6.2vh',
  right: 0,
  marginRight: '4vw',
  zIndex: 1,
});

const ActionsContainer = () => {
  const { asPath } = useRouter();

  const { isSignedIn, signIn } = useNear();

  const onSignIn = () => {
    signIn();
  };

  const [isTermsAndConditionsVisible, setIsTermsAndConditionsVisible] =
    useState(false);

  const [isUserConfirmed, setIsUserConfirmed] = useState(false);

  const handleUserChanged = (newUser: boolean) => {
    setIsTermsAndConditionsVisible(newUser);
  };

  const handleUserConfirmed = () => {
    setIsTermsAndConditionsVisible(false);
    setIsUserConfirmed(true);
  };

  const handleRejectTermsAndConditions = () => {
    setIsTermsAndConditionsVisible(false);
  };

  return (
    <Container>
      <ActionButton href="/about-us" isSelected={asPath === '/about-us'}>
        About us
      </ActionButton>
      <ActionButton href="/artworks" isSelected={asPath === '/artworks'}>
        Artworks
      </ActionButton>
      <ActionButton href="/contacts" isSelected={asPath === '/contacts'}>
        Contacts
      </ActionButton>
      {!isSignedIn && <ActionButton onClick={onSignIn}>Sign In</ActionButton>}
      {isSignedIn && (
        <UserMenu
          isUserConfirmed={isUserConfirmed}
          onUserChanged={handleUserChanged}
        />
      )}

      <TermsAndConditions
        isVisible={isTermsAndConditionsVisible}
        onAccept={handleUserConfirmed}
        onReject={handleRejectTermsAndConditions}
      />
    </Container>
  );
};

export { ActionsContainer };
