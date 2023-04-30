import { useEffect, useState } from 'react';
import { User } from '@domain/user';
import { useNear } from '@infrastructure/blockchain/near';
import { UserProfile } from '@ui/viewComponents/UserProfile';
import { useUpdateUserProfile } from '@application/user';
import { useKirunalabs } from '@screens/KirunalabsContext';

type Props = {
  preloadedUser: User;
};

const UserScreen = ({ preloadedUser }: Props) => {
  const [user, setUser] = useState(preloadedUser);

  const { user: signedUser } = useKirunalabs();

  const [isSameUser, setIsSameUser] = useState(false);

  // set edit mode if the user is the same as the signed in user
  useEffect(() => {
    if (user && signedUser && user.id === signedUser.id) {
      setIsSameUser(true);
    }
  }, [signedUser, user]);

  // request NFTS owned in NEAR
  const { useGetNftsByOwner } = useNear();
  const [requestNftsByOwner, { data: ownedNfts }] = useGetNftsByOwner();

  useEffect(() => {
    if (user && !ownedNfts) {
      const nearWallet = user.wallets.find(
        (wallet) => wallet.blockchain === 'NEAR',
      );

      if (nearWallet) {
        requestNftsByOwner(nearWallet.address);
      }
    }
  }, [user, ownedNfts, requestNftsByOwner]);

  // handle update user profile
  const [requestUpdateUser, { data: updatedUser }] = useUpdateUserProfile(
    user?.id,
  );

  const handleUserDataChange = (name: string, email?: string): void => {
    requestUpdateUser({
      name,
      email,
    });
  };

  useEffect(() => {
    if (
      updatedUser &&
      (user.name !== updatedUser.name || user.email !== updatedUser.email)
    ) {
      setUser(updatedUser);
    }
  }, [updatedUser, user]);

  // handle avatar change
  const handleAvatarChange = (file: any): void => {};

  // handle avatar remove
  const handleAvatarRemove = (): void => {};

  // handle NFT click
  const handleNftClick = (blockchain: string, id: string): void => {
    window.location.href = `/nfts/${blockchain}/${id}`;
  };

  return (
    <UserProfile
      isEdit={isSameUser}
      avatar={user?.avatar}
      name={user?.name}
      email={user?.email}
      createdNfts={user?.nfts}
      ownedNfts={ownedNfts ?? []}
      onAvatarChange={handleAvatarChange}
      onAvatarRemove={handleAvatarRemove}
      onUserDataChange={handleUserDataChange}
      onClickNft={handleNftClick}
    />
  );
};

export { UserScreen };
