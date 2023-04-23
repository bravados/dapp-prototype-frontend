import { Fragment, useEffect, useState } from 'react';
import { useGetNft } from '@application/nft';
import { Blockchain } from '@domain/wallet';
import { useNear } from '@infrastructure/blockchain/near';
import { Button } from '@mui/material';
import { KirunaDialog } from '@ui/viewComponents';

const kirunalabsUrl = process.env.NEXT_PUBLIC_KIRUNALABS_FALLBACK_URL;

const fallbackUrl = `${kirunalabsUrl}/publish/near`;

type Props = {
  tokenId?: string;
};

const PublishNft = ({ tokenId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  // check if nft exists in kirunalabs
  const [requestGetNft, { error: getNftError, data: nft }] = useGetNft();

  useEffect(() => {
    if (getNftError?.status === 404) {
      setIsDialogOpen(true);
      setDialogMessage(
        'The NFT could not be found in Kirunalabs. Did you mint it?',
      );
    }
  }, [getNftError]);

  useEffect(() => {
    if (tokenId && !getNftError && !nft) {
      requestGetNft({
        blockchain: 'NEAR' as Blockchain,
        id: tokenId,
      });
    }
  }, [tokenId, getNftError, requestGetNft, nft]);

  // check if nft already published in market
  const { useIsNftPublished } = useNear();
  const [
    requestIsNftPublished,
    { error: isNftPublishedError, data: isNftPublished },
  ] = useIsNftPublished();

  useEffect(() => {
    if (nft) {
      requestIsNftPublished(nft.id);
    }
  }, [nft, requestIsNftPublished]);

  // if nft is not published in market, show button
  const { publishNft } = useNear();

  const handlePublish = () => {
    const callbackUrl = `${fallbackUrl}?tokenId=${nft!.id}`;

    publishNft({ tokenId: nft!.id, price: '0.3', callbackUrl });
  };

  // if nft is published in market, show unpublish button
  const { unpublishNft } = useNear();

  const handleUnpublish = () => {
    const callbackUrl = `${fallbackUrl}?tokenId=${nft!.id}`;

    unpublishNft({ tokenId: nft!.id, callbackUrl });
  };

  return (
    <Fragment>
      <KirunaDialog
        isOpen={isDialogOpen}
        titleText={dialogTitle}
        contentText={dialogMessage}
      />
      {nft && !isNftPublished && (
        <Button onClick={handlePublish}>Publish</Button>
      )}
      {nft && isNftPublished && (
        <Button onClick={handleUnpublish}>Unpublish</Button>
      )}
    </Fragment>
  );
};

export { PublishNft };
