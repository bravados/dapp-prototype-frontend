import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { NftCard } from '@ui/core/NftCard';
import { Nft } from '@domain/nft/nft';

type Props = {
  nfts: Nft[];
  onClickNft: (blockchain: string, id: string) => void;
};

const NftCollection = ({ nfts, onClickNft }: Props) => {
  return (
    <Fragment>
      {nfts?.length > 0 && (
        <Grid container justifyContent={'center'}>
          {nfts.map((nft) => {
            return (
              <Grid
                key={nft.id}
                item
                sx={{ display: 'flex', justifyContent: 'center' }}
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={4}
                p={[3, 3, 3, 4, 4]}
              >
                <NftCard {...nft} onClick={onClickNft} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Fragment>
  );
};

export { NftCollection };
