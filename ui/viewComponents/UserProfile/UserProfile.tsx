import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Nft } from '@domain/nft/nft';
import { NftCollection } from '@ui/core/NftCollection';
import { ImageUploader } from '@ui/viewComponents/ImageUploader';
import { UserProfileDataForm } from '@screens/UserProfileDataForm';
import { UserProfileData } from '@screens/UserProfileData';

type Props = {
  isEdit: boolean;
  name: string;
  email: string;
  avatar?: string;
  createdNfts: Nft[];
  ownedNfts: Nft[];
  onAvatarChange: (file: any) => void;
  onAvatarRemove: () => void;
  onUserDataChange: (name: string, email?: string) => void;
  onClickNft: (blockchain: string, id: string) => void;
};

const UserProfile = ({
  isEdit,
  avatar,
  name,
  email,
  createdNfts,
  ownedNfts,
  onAvatarChange,
  onAvatarRemove,
  onClickNft,
  onUserDataChange,
}: Props) => {
  const hasCreatedNfts = createdNfts?.length > 0;
  const hasOwnedNfts = ownedNfts?.length > 0;

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
              isEdit={isEdit}
              onChange={onAvatarChange}
              onRemove={onAvatarRemove}
            />
            {isEdit ? (
              <UserProfileDataForm
                name={name}
                email={email}
                onSubmit={onUserDataChange}
              />
            ) : (
              <UserProfileData name={name} />
            )}
          </Grid>
        </Grid>
        {hasCreatedNfts && (
          <Stack direction="column" spacing={2}>
            <Typography variant="h3" noWrap>
              Nfts created by this artist
            </Typography>
            <NftCollection nfts={createdNfts} onClickNft={onClickNft} />
          </Stack>
        )}
        {hasOwnedNfts && (
          <Stack direction="column" spacing={2}>
            <Typography variant="h3" noWrap>
              Nfts owned by this user
            </Typography>
            <NftCollection nfts={ownedNfts} onClickNft={onClickNft} />
          </Stack>
        )}
      </Stack>
    </Grid>
  );
};

export { UserProfile };
