import { Grid, Typography } from '@mui/material';

type Props = {
  name: string;
};

const UserProfileData = ({ name }: Props) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item>
        <Typography variant="h3" noWrap>
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export { UserProfileData };
