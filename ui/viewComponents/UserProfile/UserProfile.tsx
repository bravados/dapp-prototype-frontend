import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Nft } from '@domain/nft/nft';
import { NftCollection } from '@ui/core/NftCollection';
import { ImageUploader } from '@ui/viewComponents/ImageUploader';
import { UserProfileData } from '@screens/UserProfileData';

type Props = {
  name: string;
  avatar?: string;
  createdNfts: Nft[];
  ownedNfts: Nft[];
  onClickNft: (blockchain: string, id: string) => void;
};

const UserProfile = ({
  avatar,
  name,
  createdNfts,
  ownedNfts,
  onClickNft,
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
            {avatar && (
              <ImageUploader
                fileUrl={avatar}
                isEdit={false}
                isLoading={false}
              />
            )}
            <UserProfileData name={name} />
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
