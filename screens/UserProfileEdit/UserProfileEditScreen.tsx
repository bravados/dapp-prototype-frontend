import { Fragment, useEffect, useState } from 'react';
import { useUpdateUserProfile } from '@application/user';
import { useKirunalabs } from '@screens/KirunalabsContext';
import { useRemoveUserAvatar } from '@application/user/removeUserAvatar.usecase';
import { KirunaDialog, UserProfileEdit } from '@ui/viewComponents';
import { Button } from '@mui/material';
import { useUploadUserAvatar } from '@application/user/uploadUserAvatar.usecase';
import { useRefetchKirunalabsUser } from '@application/user/refetchKirunalabsUser.usecase';

const UserProfileEditScreen = () => {
  const { user: signedUser } = useKirunalabs();

  const [user, setUser] = useState(signedUser);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogMessage, setDialogMessage] = useState('');

  // handle update user profile
  const [requestUpdateUser, { data: updatedUser }] = useUpdateUserProfile();

  const handleUserDataChange = (name: string, email?: string): void => {
    requestUpdateUser({
      id: user!.id,
      name,
      email,
    });
  };

  useEffect(() => {
    if (
      user &&
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
  ] = useUploadUserAvatar();

  const handleAvatarChange = (file: any): void => {
    requestUploadUserAvatar({ id: user!.id, file });
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
  ] = useRemoveUserAvatar();

  const handleAvatarRemove = (): void => {
    requestRemoveUserAvatar({ id: user!.id });
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Fragment>
      <KirunaDialog
        isOpen={isDialogOpen}
        title={'Error'}
        content={dialogMessage}
      >
        <Button onClick={handleDialogClose}>Close</Button>
      </KirunaDialog>
      <UserProfileEdit
        isLoading={uploadAvatarLoading || removeAvatarLoading}
        avatar={user?.avatar}
        name={user?.name ?? ''}
        email={user?.email ?? ''}
        onAvatarChange={handleAvatarChange}
        onAvatarRemove={handleAvatarRemove}
        onUserDataChange={handleUserDataChange}
      />
    </Fragment>
  );
};

export { UserProfileEditScreen };
