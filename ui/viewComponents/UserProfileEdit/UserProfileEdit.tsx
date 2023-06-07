import { Divider, Grid, Stack } from '@mui/material';
import { ImageUploader } from '@ui/viewComponents/ImageUploader';
import { UserProfileDataForm } from '@screens/UserProfileDataForm';

type Props = {
  isLoading: boolean;
  name: string;
  email: string;
  avatar?: string;
  onAvatarChange: (file: any) => void;
  onAvatarRemove: () => void;
  onUserDataChange: (name: string, email?: string) => void;
};

const UserProfileEdit = ({
  isLoading,
  avatar,
  name,
  email,
  onAvatarChange,
  onAvatarRemove,
  onUserDataChange,
}: Props) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <ImageUploader
              fileUrl={avatar}
              isEdit={true}
              isLoading={isLoading}
              onChange={onAvatarChange}
              onRemove={onAvatarRemove}
            />
            <UserProfileDataForm
              name={name}
              email={email}
              onSubmit={onUserDataChange}
            />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export { UserProfileEdit };
