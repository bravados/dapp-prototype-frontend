import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

type Props = {
  blockchain: string;
  price: string;
};

const PriceBox = ({ blockchain, price }: Props) => {
  const blockchainLowercased = blockchain.toLowerCase();

  return (
    <Box mt={3}>
      <Grid container columns={1}>
        <Grid item>
          <Typography
            variant="body2"
            color="text.primary"
            mb={2}
            sx={{ mixBlendMode: 'difference' }}
          >
            Price
          </Typography>
        </Grid>
        <Grid container spacing={2} columns={2}>
          <Grid item>
            <Image
              src={require(`./${blockchainLowercased}/logo.png`)}
              width={20}
              alt="Near Token"
            />
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 'bold', mixBlendMode: 'difference' }}
            >
              {price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export { PriceBox };
