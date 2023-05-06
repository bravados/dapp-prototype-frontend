import { Fragment } from 'react';
import { Grid, Hidden, Typography } from '@mui/material';
import { styled } from '@stitches/react';

const ManifestoOverview = styled('div', {
  width: '100vw',
  height: '100vh',
});

const ManifestoDetails = styled('div', {
  width: '100vw',
  height: '396vh',
  backgroundColor: '#0F0F0F',
  paddingTop: '28vh',
});

const StyledGrid = styled(Grid, {
  position: 'absolute',
  top: 0,
  left: 0,
  marginTop: '18.9vh',
  paddingLeft: '16.3vw',
  paddingRight: '16.3vw',
});

const StyledTitle = styled(Typography, {
  marginBottom: '5.4vh',
});

const StyledParagraph = styled(Typography, {
  marginBottom: '2.9vh',
});

const BodyTypography = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledParagraph variant="body1" textAlign={'center'}>
      {children}
    </StyledParagraph>
  );
};

const LogosBackground = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
});

const DetailsLogosBackground = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '76.56vw',
  height: '196.06vh',
  marginTop: '144.76vh',
  marginLeft: '11.74vw',
});

const DetailsPointContainer = styled('div', {
  width: '29.8vw',
  height: '15.58vw',
  marginBottom: '3vh',
});

type DetailsPointProps = {
  children: React.ReactNode;
  textAlign: 'left' | 'right';
};

const DetailsPointNumber = ({ textAlign, children }: DetailsPointProps) => {
  return (
    <Typography
      style={{
        top: '0',
        textAlign: textAlign,
        fontSize: '128px',
        WebkitTextStroke: '4px #B3B3B3',
        color: 'transparent',
        fontWeight: 'normal',
      }}
    >
      {children}
    </Typography>
  );
};

const DetailsPointText = ({ textAlign, children }: DetailsPointProps) => {
  return (
    <Typography
      variant="h5"
      style={{
        top: '0',
        marginTop: '10.5vh',
        textAlign: textAlign,
      }}
    >
      {children}
    </Typography>
  );
};

const VerticalSeparatorContainer = styled(Grid, {
  marginLeft: '-13.1vw',
  marginRight: '-6.7vw',
});

const VerticalSeparator = styled('div', {
  border: '2px solid',
  color: '#7E7E7E',
  height: '330vh',
  marginTop: '-2.6vh',
  marginBottom: '38.5vh',
});

const Manifesto = () => {
  return (
    <Fragment>
      <ManifestoOverview>
        <StyledGrid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <StyledTitle variant="h3">MANIFESTO</StyledTitle>
          </Grid>
          <Grid item>
            <BodyTypography>
              Green Light è una startup innovativa dedicata alla curatela e
              vendita di crypto art che si propone come piattaforma promotrice
              di arte e cultura. Operando come ponte tra sostenibilità e digital
              arts, l’obiettivo è quello di instaurare un dialogo tra presente e
              futuro, tra “crypto” e “reale”.{' '}
            </BodyTypography>
          </Grid>
          <Grid item>
            <BodyTypography>
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
            </BodyTypography>
          </Grid>
          <BodyTypography>
            In questo contesto dobbiamo costruire un ponte tra realtà e nuova
            realtà che ci permetta di affrontare questa transizione in modo
            cosciente e responsabile, consapevoli della nostra natura di essere
            umani. Dobbiamo riconsiderare l’idea di uomo come unità di misura e
            assumere la concezione più olistica di essere ecologico, per evitare
            di subire il progresso tecnologico.
          </BodyTypography>
          <Grid item>
            <BodyTypography>
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
            </BodyTypography>
          </Grid>
        </StyledGrid>
        <LogosBackground src="manifesto-logos-background.svg" />
      </ManifestoOverview>
      <ManifestoDetails>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            md={5}
          >
            <DetailsPointContainer>
              <DetailsPointNumber textAlign="right">01</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="right">03</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="right">05</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="right">07</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="right">09</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="right">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>
          </Grid>
          <Hidden mdDown>
            <VerticalSeparatorContainer
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              md={2}
            >
              <VerticalSeparator />
            </VerticalSeparatorContainer>
          </Hidden>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            xs={12}
            md={5}
          >
            <DetailsPointContainer>
              <DetailsPointText textAlign="left">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="left">02</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="left">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="left">04</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="left">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="left">06</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="left">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="left">08</DetailsPointNumber>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointText textAlign="left">
                Occorre intendere l’arte digitale come mezzo di divulgazione
                culturale e generatore di esperienze sensoriali: sviluppo
                necessario per una continuità di ricerca artistica
                generazionale.
              </DetailsPointText>
            </DetailsPointContainer>

            <DetailsPointContainer>
              <DetailsPointNumber textAlign="left">10</DetailsPointNumber>
            </DetailsPointContainer>
          </Grid>
        </Grid>
        <DetailsLogosBackground src="manifesto-details-logos-background.svg" />
      </ManifestoDetails>
    </Fragment>
  );
};

export { Manifesto };
