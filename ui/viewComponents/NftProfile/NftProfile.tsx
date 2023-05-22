import { CardMedia } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

type Props = {
  title: string;
  description: string;
  media: string;
  creator: {
    id: number;
    name: string;
    avatar: string;
  };
  owner: {
    id?: number;
    name: string;
    avatar?: string;
  };
  accountBalance: string;
  price?: string;
};

const NftProfile = ({
  title,
  description,
  media,
  creator,
  owner,
  accountBalance,
  price,
}: Props) => {
  return (
    <Grid2 xs={12} md={6}>
      <CardMedia component="img" src={media} />
    </Grid2>
  );
};

export { NftProfile };
