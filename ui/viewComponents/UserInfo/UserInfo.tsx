import { Avatar, Grid, Link, Typography } from '@mui/material';

type Props = {
  title: string;
  id?: number;
  name: string;
  avatar?: string;
};

const UserInfo = ({ title, id, name, avatar }: Props) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
      </Grid>

      <Grid item>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>

          <Grid item>
            {id ? (
              <Link href={`/users/${id}`}>
                <Typography variant="h4">{name}</Typography>
              </Link>
            ) : (
              <Typography variant="h4">{name}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { UserInfo };
