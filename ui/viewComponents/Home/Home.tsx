import { Button, Grid, Hidden, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '@ui/core/CustomLink';

const MainDiv = styled('div', {
  width: 'auto',
  height: 'auto',
});

const StyledGrid = styled(Grid, {
  paddingTop: '32vh',
  paddingBottom: '32vh',
  paddingLeft: '14vw',
  paddingRight: '14vw',
});

const StyledHorizontalSeparator = styled('div', {
  width: '3.4vw',
  border: '2px solid white',
  borderColor: 'white',
  marginTop: '7vh',
});

const StyledVerticalSeparator = styled('div', {
  height: '5.3vw',
  border: '2px solid white',
  borderColor: 'white',
  marginTop: '20px',
  marginBottom: '20px',
});

const ExploreButton = styled(Button, {
  fontSize: '18px',
  fontWeight: 'bolder',
  paddingTop: '1.6vh',
  paddingBottom: '1.6vh',
  paddingLeft: '2.9vw',
  paddingRight: '2.9vw',
  borderRadius: '25px',
  border: '4px solid',
  minWidth: '12.6vw',
  marginTop: '7.9vh',
});

const ThreeTimesLogo = styled('img', {
  width: '28.9vw',
  height: '14vh',
  marginTop: '6.2vh',
  marginLeft: '-50px',
});

const Video = styled('video', {
  objectFit: 'cover',
  position: 'absolute',
  zIndex: -1,
  width: '100%',
  height: '100%',
  filter: 'brightness(0.5)',
});

const Circunferences = styled('img', {
  position: 'absolute',
  bottom: '0',
  right: '0',
});

const Home = () => {
  return (
    <MainDiv>
      <Hidden mdDown>
        <Video
          src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/mangrove.mp4`}
          autoPlay
          loop
          muted
          playsInline
        />
      </Hidden>
      <StyledGrid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={5}>
          <Typography variant="h2">
            Discover, collect and sell extraordinary NTFs
          </Typography>
          <ExploreButton>
            <CustomLink href="/">EXPLORE</CustomLink>
          </ExploreButton>
        </Grid>

        <Grid container item xs={2} justifyContent="center">
          <Hidden mdDown>
            <StyledHorizontalSeparator />
          </Hidden>
          <Hidden mdUp>
            <StyledVerticalSeparator />
          </Hidden>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={5}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
        >
          <Typography variant="body1">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Typography>
          <ThreeTimesLogo src="/replicated-logo.svg" />
        </Grid>
        <Circunferences src="/circunferences.svg" />
      </StyledGrid>
    </MainDiv>
  );
};

export { Home };
