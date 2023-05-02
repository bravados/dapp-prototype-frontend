import { Fragment, useEffect, useState } from 'react';
import { User } from '@domain/user';
import { useNear } from '@infrastructure/blockchain/near';
import { UserProfile } from '@ui/viewComponents/UserProfile';
import { useUpdateUserProfile } from '@application/user';
import { useKirunalabs } from '@screens/KirunalabsContext';
import { useRemoveUserAvatar } from '@application/user/removeUserAvatar.usecase';
import { KirunaDialog } from '@ui/viewComponents';
import { Button } from '@mui/material';
import { useUploadUserAvatar } from '@application/user/uploadUserAvatar.usecase';
import { useRefetchKirunalabsUser } from '@application/user/refetchKirunalabsUser.usecase';

type Props = {
  preloadedUser: User;
};

const UserScreen = ({ preloadedUser }: Props) => {
  const [user, setUser] = useState(preloadedUser);

  const { user: signedUser } = useKirunalabs();

  const [isSameUser, setIsSameUser] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');

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
  const refetchKirunalabsUser = useRefetchKirunalabsUser();

  const [
    requestUploadUserAvatar,
    {
      loading: uploadAvatarLoading,
      error: uploadAvatarError,
      success: uploadAvatarSuccess,
    },
  ] = useUploadUserAvatar(user?.id);

  const handleAvatarChange = (file: any): void => {
    requestUploadUserAvatar({ file });
  };

  useEffect(() => {
    if (uploadAvatarError) {
      console.error(uploadAvatarError.message);
      setDialogMessage('Avatar could not be uploaded. Contact Kirunalabs');
      setIsDialogOpen(true);
    }
  }, [uploadAvatarError]);

  useEffect(() => {
    if (uploadAvatarSuccess) {
      refetchKirunalabsUser();
    }
  }, [uploadAvatarSuccess, refetchKirunalabsUser]);

  // handle avatar remove
  const [
    requestRemoveUserAvatar,
    {
      loading: removeAvatarLoading,
      error: removeAvatarError,
      success: removeAvatarSuccess,
    },
  ] = useRemoveUserAvatar(user.id);

  const handleAvatarRemove = (): void => {
    requestRemoveUserAvatar();
  };

  useEffect(() => {
    if (removeAvatarError) {
      console.error(removeAvatarError.message);
      setDialogMessage('Avatar could not be removed. Contact Kirunalabs');
      setIsDialogOpen(true);
    }
  }, [removeAvatarError]);

  useEffect(() => {
    if (removeAvatarSuccess) {
      refetchKirunalabsUser();
    }
  }, [removeAvatarSuccess, refetchKirunalabsUser]);

  // if user is refetched, update user
  useEffect(() => {
    if (signedUser) {
      setUser(signedUser);
    }
  }, [signedUser]);

  // handle NFT click
  const handleNftClick = (blockchain: string, id: string): void => {
    window.location.href = `/nfts/${blockchain}/${id}`;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Fragment>
      <KirunaDialog
        isOpen={isDialogOpen}
        titleText={'Error'}
        contentText={dialogMessage}
      >
        <Button onClick={handleDialogClose}>Close</Button>
      </KirunaDialog>
      <UserProfile
        isEdit={isSameUser}
        isLoading={uploadAvatarLoading || removeAvatarLoading}
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
    </Fragment>
  );
};

export { UserScreen };
