import { Fragment, useEffect, useState } from 'react';
import { useGetNft } from '@application/nft';
import { Blockchain } from '@domain/wallet';
import { useNear } from '@infrastructure/blockchain/near';
import { Button, CardMedia, Grid } from '@mui/material';
import { KirunaDialog, PublishNftForm } from '@ui/viewComponents';
import { NftCard } from '@ui/core/NftCard';
import { ActionButton } from '@ui/core';

const kirunalabsUrl = process.env.NEXT_PUBLIC_KIRUNALABS_FALLBACK_URL;

const fallbackUrl = `${kirunalabsUrl}/publish/near`;

type Props = {
  tokenId?: string;
};

const PublishNft = ({ tokenId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // check if nft exists in kirunalabs
  const [requestGetNft, { error: getNftError, data: nft }] = useGetNft();

  useEffect(() => {
    if (tokenId && !getNftError && !nft) {
      requestGetNft({
        blockchain: 'NEAR' as Blockchain,
        id: tokenId,
      });
    }
  }, [tokenId, getNftError, requestGetNft, nft]);

  useEffect(() => {
    if (getNftError?.status === 404) {
      setIsDialogOpen(true);
      setDialogMessage(
        'The NFT could not be found in Kirunalabs. Did you mint it?',
      );
    }
  }, [getNftError]);

  // check if nft already published in market
  const { useGetSale } = useNear();
  const [requestGetSale, { data: sale, error }] = useGetSale();

  useEffect(() => {
    if (nft && !error) {
      requestGetSale(nft.id);
    }
  }, [nft, error, requestGetSale]);

  // if nft is not published in market, show button
  const { publishNft } = useNear();

  const handlePublish = (price: string) => {
    const callbackUrl = `${fallbackUrl}?tokenId=${nft!.id}`;

    publishNft({ tokenId: nft!.id, price, callbackUrl });
  };

  // if nft is published in market, show unpublish button
  const { unpublishNft } = useNear();

  const handleUnpublish = () => {
    const callbackUrl = `${fallbackUrl}?tokenId=${nft!.id}`;

    unpublishNft({ tokenId: nft!.id, callbackUrl });
  };

  return (
    <Grid container direction="column" spacing={2} alignItems={'center'}>
      <KirunaDialog
        isOpen={isDialogOpen}
        title={dialogTitle}
        content={dialogMessage}
      >
        <Button onClick={handleDialogClose}>Close</Button>
      </KirunaDialog>

      <Grid item>
        <CardMedia component="img" image={`${nft?.media}`} alt={nft?.title} />
      </Grid>
      <Grid item>
        {nft && !sale && <PublishNftForm onSubmit={handlePublish} />}
        {nft && sale && (
          <ActionButton onClick={handleUnpublish}>Unpublish</ActionButton>
        )}
      </Grid>
    </Grid>
  );
};

export { PublishNft };
