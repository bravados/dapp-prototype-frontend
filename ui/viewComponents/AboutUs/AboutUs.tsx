import { styled } from '@stitches/react';
import { DescriptionText, OutlinedText, Paragraph, Title } from '@ui/core';
import { Fragment } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Stack } from '@mui/material';

const WhoWeAre = styled('div', {
  paddingTop: '32vh',
  paddingBottom: '32vh',
});

const Points = styled('div', {
  backgroundColor: '#E4E4E4',
  top: '0',
  padding: '18vh 18vw',
});

const WhatWeDo = styled('div', {
  paddingTop: '32.5vh',
  height: '100vh',
});

const StyledStack = styled(Stack, {
  height: '24.7',
});

const AboutUs = () => {
  return (
    <Fragment>
      <WhoWeAre>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Title>WHO WE ARE</Title>
          </Grid>
          <Grid>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. le
              tendenze profonde di una società e sviluppa una coscienza critica
              indispensabile per lo sviluppo.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. le
              tendenze profonde di una società e sviluppa una coscienza critica
              indispensabile per lo sviluppo.
            </Paragraph>
          </Grid>
        </Grid>
      </WhoWeAre>
      <Points>
        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          alignContent={'center'}
          spacing={7}
        >
          <Grid xs={12} md={4}>
            <StyledStack direction={'column'}>
              <OutlinedText textAlign="center">01</OutlinedText>
              <DescriptionText textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </DescriptionText>
            </StyledStack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack direction={'column'}>
              <OutlinedText textAlign="center">02</OutlinedText>
              <DescriptionText textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </DescriptionText>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack direction={'column'}>
              <OutlinedText textAlign="center">03</OutlinedText>
              <DescriptionText textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </DescriptionText>
            </Stack>
          </Grid>
        </Grid>
      </Points>
      <WhatWeDo>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Title>WHAT WE DO</Title>
          </Grid>
          <Grid>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. le
              tendenze profonde di una società e sviluppa una coscienza critica
              indispensabile per lo sviluppo.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. le
              tendenze profonde di una società e sviluppa una coscienza critica
              indispensabile per lo sviluppo.
            </Paragraph>
          </Grid>
        </Grid>
      </WhatWeDo>
    </Fragment>
  );
};

export { AboutUs };
