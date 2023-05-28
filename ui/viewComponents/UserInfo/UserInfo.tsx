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
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={6}
      >
        <div>
          <Typography variant="h6">{title}</Typography>
          {id ? (
            <Link href={`/users/${id}`}>
              <Typography variant="h4">{name}</Typography>
            </Link>
          ) : (
            <Typography variant="h4">{name}</Typography>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export { UserInfo };
