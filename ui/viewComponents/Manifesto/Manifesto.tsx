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
            <Title>MANIFESTO</Title>
          </Grid>
          <Grid>
            <Paragraph>
              Green Light è una startup innovativa dedicata alla curatela e
              vendita di crypto art che si propone come piattaforma promotrice
              di arte e cultura. Operando come ponte tra sostenibilità e digital
              arts, l’obiettivo è quello di instaurare un dialogo tra presente e
              futuro, tra “crypto” e “reale”.{' '}
            </Paragraph>
          </Grid>
          <Grid>
            <Paragraph>
              La realtà virtuale e realtà aumentata stanno trasformando il modo
              di percepire e conoscere la vita. La realtà umana come l’abbiamo
              fino ad ora conosciuta si sta sempre più ibridando in una
              dimensione alternativa e parallela. Stiamo compiendo un percorso
              di sostituzione e ampliamento di esperienze sensoriali più
              immersive, che sono però lontane dalla nostra natura di essere
              umani. La tecnologia rivoluziona il concetto di vita umana legato
              unicamente al suo ambiente e lo sposta verso una percezione
              sensoriale connessa a informazioni multimediali aggiuntive e
              manipolate.
            </Paragraph>
          </Grid>
          <Paragraph>
            In questo contesto dobbiamo costruire un ponte tra realtà e nuova
            realtà che ci permetta di affrontare questa transizione in modo
            cosciente e responsabile, consapevoli della nostra natura di essere
            umani. Dobbiamo riconsiderare l’idea di uomo come unità di misura e
            assumere la concezione più olistica di essere ecologico, per evitare
            di subire il progresso tecnologico.
          </Paragraph>
          <Grid>
            <Paragraph>
              In una cultura di tipo prevalentemente tecnico-industriale non
              attenta a tutti i contesti naturali e sociali e che mette a
              rischio l’esistenza delle future generazioni, dobbiamo trovare la
              capacità di sviluppare progetti etico- culturali che ci orientino
              verso una società più attenta con un radicato senso di comunità.
              In questo contesto l’arte, con la sua capacità multisensoriale di
              coinvolgere e comunicare, riprende valore e assume un ruolo chiave
              per l’assunzione, l’assorbimento e l’assimilazione di questi
              valori. L’arte è in grado di esprimere e monitorare le sensazioni
              e le tendenze profonde di una società e sviluppa una coscienza
              critica indispensabile per lo sviluppo.
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
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
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
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
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
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
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
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
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
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DescriptionText>
            </DescriptionTextContainer>
          </LeftBorderedGrid>

          <RightBorderedGrid xs={6}>
            <DescriptionTextContainer>
              <DescriptionText variant="h4" textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
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
