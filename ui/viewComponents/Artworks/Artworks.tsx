import { Fragment } from 'react';
import { Grid, Typography } from '@mui/material';
import { styled } from '@stitches/react';

type ContainerProps = {
  backgroundUrl: string;
  backgroundBrightness: number;
  children: React.ReactNode;
};

const Container = ({
  backgroundUrl,
  children,
  backgroundBrightness,
}: ContainerProps) => {
  const StyledDiv = styled('div', {
    position: 'sticky',
    top: 0,
    height: '100vh',
  });

  const Background = styled('img', {
    filter: `brightness(${backgroundBrightness})`,
  });

  return (
    <StyledDiv>
      <Background src={backgroundUrl} />
      {children}
    </StyledDiv>
  );
};

const StyledGrid = styled(Grid, {
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  top: 0,
});

type ProjectProps = {
  name: string;
  backgroundUrl: string;
  backgroundBrightness: number;
  path?: string;
};

const Project = ({
  name,
  backgroundUrl,
  backgroundBrightness,
}: ProjectProps) => {
  return (
    <Container
      backgroundUrl={backgroundUrl}
      backgroundBrightness={backgroundBrightness}
    >
      <StyledGrid
        container
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid item>
          <Typography variant="h1" textAlign={'center'}>
            {name}
          </Typography>
        </Grid>
      </StyledGrid>
    </Container>
  );
};

const Artworks = () => {
  return (
    <Fragment>
      <Project
        name="Mangroves utopia"
        backgroundUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/artworks/mangroves.svg`}
        backgroundBrightness={0.4}
      />
      <Project
        name="Sign of the times"
        backgroundUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/artworks/sign-of-the-times.svg`}
        backgroundBrightness={0.3}
      />
      <Project
        name="Awakening"
        backgroundUrl={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN}/artworks/awakening.svg`}
        backgroundBrightness={0.4}
      />
    </Fragment>
  );
};

export { Artworks };
