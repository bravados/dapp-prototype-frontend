import { Fragment } from 'react';
import { CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import { UserInfo } from '../UserInfo';

const MediaContainer = styled('div', {
  width: '50vw',
  margin: 'auto',
});

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
    <Fragment>
      <Grid item xs={12}>
        <MediaContainer>
          <CardMedia
            component="img"
            src={media}
            sx={{ objectFit: 'contain' }}
          />
        </MediaContainer>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <div>
            <Typography variant="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {description}
            </Typography>
          </div>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <div>
            <UserInfo
              title={'Artist'}
              id={creator.id}
              name={creator.name}
              avatar={creator.avatar}
            />
          </div>
          <div>
            <UserInfo
              title={'Owner'}
              id={owner.id}
              name={owner.name}
              avatar={owner.avatar}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export { NftProfile };
