import React from 'react';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { PriceBox } from '@ui/core/PriceBox';

export type Props = {
  id: string;
  title: string;
  description: string;
  media: string;
  price?: string;
  blockchain: string;
  onClick: (blockchain: string, id: string) => void;
};

const MEDIUM_SIZE = 352;

const ipfsUrl = 'https://cloudflare-ipfs.com/ipfs';

const NftCard = ({ id, title, media, price, blockchain, onClick }: Props) => {
  return (
    <Card square={true} sx={{ width: MEDIUM_SIZE }}>
      <CardActionArea
        onClick={() => {
          onClick(blockchain, id);
        }}
      >
        <CardMedia component="img" image={`${ipfsUrl}/${media}`} alt={title} />
        <CardContent>
          <Grid container>
            <Typography
              variant="h3"
              noWrap
              gutterBottom
              sx={{ fontStyle: 'bold' }}
            >
              {title}
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              {price && <PriceBox price={price} blockchain={blockchain} />}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { NftCard };
