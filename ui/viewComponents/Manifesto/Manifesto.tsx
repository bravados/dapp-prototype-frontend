import { Fragment } from 'react';
import { Link } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@stitches/react';
import { DescriptionText, OutlinedText, Paragraph, Title } from '@ui/core';

const ManifestoOverview = styled('div', {
  paddingTop: '18.9vh',
});

const ManifestoDetails = styled('div', {
  backgroundColor: '#0F0F0F',
  paddingTop: '28vh',
  paddingLeft: '18.74vw',
  paddingRight: '18.74vw',
  paddingBottom: '30vh',
});

const ManifestoOverviewLogos = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '99vw',
  height: '100vh',
});

const ManifestoDetailsLogos = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '76.56vw',
  height: '196.06vh',
  marginTop: '144.76vh',
  marginLeft: '11.74vw',
});

const LeftBorderedGrid = styled(Grid, {
  borderLeft: '1px solid #B3B3B3',
});

const RightBorderedGrid = styled(Grid, {
  borderRight: '1px solid #B3B3B3',
});

const DescriptionTextContainer = styled('div', {
  top: '0',
  marginTop: '10.5vh',
});

const Manifesto = () => {
  return (
    <Fragment>
      <ManifestoOverview>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <Title>MANIFESTO</Title>
          </Grid>
          <Grid>
            <Paragraph>
              DIGITALIZATION, WEALTHNESS DISTRIBUTION, AI PROTECTION
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              This prototype was born as an attempt of creating a platform that
              would allow artists to create and sell their digital artworks in a
              decentralized way, without the need of a third party, in an easy
              way with some underlaying key principles.
            </Paragraph>
          </Grid>
          <Paragraph>
            This project envisioned a win-win situation between artists and
            collectors empowering a business model where not only the artists
            benefit from royalties.
          </Paragraph>
          <Grid>
            <Paragraph>
              Artists, during the minting process, could decide who would
              receive a percentage of the succeeding sales. This would
              potentially translate into a new way of thinking about
              appreciation symbols or "tips" for the ones that the artist cares
              about or simply a way of giving back to the community (where the
              community can be whoever that has a crypto wallet).
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              Initially meant for consolidated artists that would like to help
              with their art to some cause that they specifically feel connected
              to (i.e. another emerging artist, environmental NGOs, medical
              conditions research, etc), the platform would ensure a transparent
              immediate donation for the affected cause.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              This idea emerges from the awareness of a polarized world in terms
              of money distribution. It aimed to combine the power of (digital)
              art with the power of the Blockchain as a means for individuals to
              help others while being at possession of something they want.
            </Paragraph>
          </Grid>
        </Grid>
        <ManifestoOverviewLogos src="manifesto-logos-background.svg" />
      </ManifestoOverview>
      <ManifestoDetails>
        <Grid spacing={5} container>
          <RightBorderedGrid xs={6}>
            <OutlinedText textAlign="right">01</OutlinedText>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="left">
                Stop speculating the Blockchain by providing some useful
                application instead. While it could still be attractive to
                investors, this platform was only meant to leverage the
                potential of the Blockchain to directly help each other.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Artists would be protected against AI generated artworks by
                applying the most recent findings to the art that is minted in
                the platform (i.e.{' '}
                <Link href="https://glaze.cs.uchicago.edu/what-is-glaze.html">
                  Glaze
                </Link>
                ), ensuring their style is not exposed to massive abuse.
              </DescriptionText>
            </DescriptionTextContainer>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <OutlinedText textAlign="left">02</OutlinedText>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <OutlinedText textAlign="right">03</OutlinedText>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="left">
                Even though the ownership of a NFT can be verified, the image
                itself is public. This means that anyone can download it and use
                it for whatever purpose they want. This is a problem for artists
                in the way that they can't control the use of their art. As a
                consequence, the motivation for collectors to adquire a digital
                image by paying decreases dramatically, since a free version of
                the digital image can have the same application value.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>
        </Grid>
      </ManifestoDetails>
    </Fragment>
  );
};

export { Manifesto };
