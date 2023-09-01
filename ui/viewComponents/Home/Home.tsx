import { Grid, Hidden, Link, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import { CustomLink } from '@ui/core/CustomLink';

const MainDiv = styled('div', {
  width: 'auto',
  height: 'auto',
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

const ExploreButton = styled('div', {
  position: 'absolute',
  fontSize: '18px',
  fontWeight: 'bolder',
  paddingTop: '1.6vh',
  paddingBottom: '1.6vh',
  paddingLeft: '2.9vw',
  paddingRight: '2.9vw',
  borderRadius: '25px',
  border: '4px solid white',
  marginTop: '7.9vh',
});

const ThreeTimesLogo = styled('img', {
  position: 'absolute',
  marginTop: '20vh',
});

const Video = styled('video', {
  objectFit: 'cover',
  top: 0,
  left: 0,
  position: 'absolute',
  zIndex: -1,
  width: '100vw',
  height: '100vh',
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
          src={`${process.env.NEXT_PUBLIC_HOME_VIDEO}`}
          autoPlay
          loop
          muted
          playsInline
        />
      </Hidden>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={5}>
          <Typography variant="h2">
            This is a prototype of a website that allows you to create NFTs in
            the <Link href="https://near.org/ecosystem">Near ecosystem</Link>.
          </Typography>
          <ExploreButton>
            <CustomLink href="/nfts">
              <Typography>See the NFTs</Typography>
            </CustomLink>
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
            The tech stack is composed by (1) a front-end app built with React,
            Next.js, TypeScript and Stitches, which is serving the website you
            are seeing right now, (2) a back-end app built with NestJS and
            Typescript which receives the requests coming from the front-end and
            performs some business logic, (3) two smart contracts written in
            Rust and deployed into the NEAR blockchain. <br />
            <br />
            Both the front-end and the back-end have their source code in Github
            repositories and are physically deployed in Amazon Web Services by
            using Github Actions.
          </Typography>
        </Grid>
      </Grid>
    </MainDiv>
  );
};

export { Home };
