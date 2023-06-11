import React from 'react';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { PriceBox } from '@ui/core/PriceBox';
import { styled } from '@stitches/react';

const MEDIUM_SIZE = 352;

const ImageWrapper = styled('div', {
  height: `${MEDIUM_SIZE}px`,
});

export type Props = {
  id: string;
  title: string;
  description: string;
  media: string;
  price?: string;
  blockchain: string;
  onClick: (blockchain: string, id: string) => void;
};

const NftCard = ({ id, title, media, price, blockchain, onClick }: Props) => {
  return (
    <Card square={true} sx={{ width: MEDIUM_SIZE }}>
      <CardActionArea
        onClick={() => {
          onClick(blockchain, id);
        }}
      >
        <ImageWrapper>
          <CardMedia component="img" image={`${media}`} alt={title} />
        </ImageWrapper>
        <CardContent>
          <Grid container>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography
                variant="h3"
                noWrap
                gutterBottom
                sx={{ fontStyle: 'bold', mixBlendMode: 'difference' }}
              >
                {title}
              </Typography>
              {price && <PriceBox price={price} blockchain={blockchain} />}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { NftCard };
