import { Fragment } from 'react';
import { Hidden, Typography } from '@mui/material';
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
            <Title>KIRUNA LABS MANIFESTO</Title>
          </Grid>
          <Grid>
            <Paragraph>
              DIGITALIZATION, SUSTAINABLE DEVELOPMENT, COMMUNITY
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              In compliance with the seventeen sustainable development goals
              expressed by the United Nations, our will is to participate in the
              achievement of these goals by working closely with non-profit
              organizations engaged in the implementation of projects interested
              in improving social and environmental conditions of communities in
              specific areas. Our commitment is to enhance artists linked to
              these contexts, supporting their digitization and providing them
              access to the international market. We believe in the importance
              of artistic expression that elaborates different perspectives on
              reality and the achievement of a dialogue between them.
            </Paragraph>
          </Grid>
          <Paragraph>
            Virtual reality and augmented reality are transforming the way we
            perceive and learn about life. Human reality as we have known it
            until now is increasingly hybridizing in an alternative and parallel
            dimension. We are on a path of replacing and expanding more
            immersive sensory experiences, which are however far from our nature
            as human beings. Technology revolutionizes the concept of human life
            linked solely to its environment and shifts it towards a sensory
            perception connected to additional and manipulated multimedia
            information.
          </Paragraph>
          <Grid>
            <Paragraph>
              In this context we must build a bridge between reality and new
              reality that allows us to face this transition in a conscious and
              responsible way, aware of our nature as human beings. We must
              reconsider the idea of man as unit of measurement and take on the
              more holistic conception of being ecological in order to avoid
              being subjected to the technological progress.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              In a predominantly technical-industrial culture that is not
              attentive to all natural and social contexts that puts the
              existence of future generations at risk, we must find the ability
              to develop ethical-cultural projects that orient us towards a more
              committed society with a deep-rooted sense of community.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              In this context, art, with its multisensory ability to involve and
              communicate, regains value and assumes a key role for the
              assumption, absorption and assimilation of these values.
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              Art is able to express and monitor the deep feelings and
              tendencies of a society and develops a critical consciousness
              indispensable for development.
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
                It is necessary to interpret digital art as a means of cultural
                dissemination and generator of sensory experiences: development
                necessary for a continuity of generational artistic research.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                It is necessary to think about artistic practices and cultural
                investments with the aim of mobilizing an organic interest on
                aspects of sustainable development.
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
                We must take on a cultural responsibility through the social
                function of art understood as a component of cultural
                enhancement and vitality, that is not exclusively financial.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                We must actively participate in the ecological transition,
                adopting governance in compliance with the sustainable
                development goals.
              </DescriptionText>
            </DescriptionTextContainer>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <OutlinedText textAlign="left">04</OutlinedText>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <OutlinedText textAlign="right">05</OutlinedText>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="left">
                Sustainability from a long-term perspective that reconciles the
                interests of current generations with those of future
                generations and that considers the interdependent four
                dimensions: people, profit, planet and progress.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                We must aim to create a sense of active and sensitive community
                through principles of solidarity and non-exclusive but
                participatory belonging.
              </DescriptionText>
            </DescriptionTextContainer>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <OutlinedText textAlign="left">06</OutlinedText>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <OutlinedText textAlign="right">07</OutlinedText>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="left">
                Humans and technology are increasingly a hybrid concept: it is
                necessary to create a healthy and balanced relationship.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                We live between the real world and the digital world: it is
                necessary to treat this transition in a socially responsible way
                by creating a balanced bridge between online and offline.
              </DescriptionText>
            </DescriptionTextContainer>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <OutlinedText textAlign="left">08</OutlinedText>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <OutlinedText textAlign="right">09</OutlinedText>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="left">
                Decentralization allows us to have control over personal data
                and digital identities, restoring freedom and autonomy and
                giving breath to a circular structure.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                The market must aim to operate in compliance with a cultural
                responsibility following a sustainable and transparent benefit
                model.
              </DescriptionText>
            </DescriptionTextContainer>
          </RightBorderedGrid>
          <LeftBorderedGrid xs={6}>
            <OutlinedText textAlign="left">10</OutlinedText>
          </LeftBorderedGrid>
        </Grid>
        <ManifestoDetailsLogos src="manifesto-details-logos-background.svg" />
      </ManifestoDetails>
    </Fragment>
  );
};

export { Manifesto };
