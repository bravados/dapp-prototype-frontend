import { Fragment, useEffect, useState } from 'react';
import { KirunaDialog } from '@ui/viewComponents';
import { useCreateNft, useGetNft as useGetBackendNft } from '@application/nft';
import { useNear } from '@infrastructure/blockchain/near';
import { Button } from '@mui/material';
import { Blockchain } from '@domain/wallet';

type CreateNftFallbackProps = {
  isError?: boolean;
  tokenId?: string;
};

const CreateNftFallback = ({ isError, tokenId }: CreateNftFallbackProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  // if mint comes with error, show dialog
  useEffect(() => {
    setIsDialogOpen(!!isError);
    setDialogTitle('The NFT could not be minted');
  }, [isError]);

  // check if nft exists in kirunalabs
  const [requestGetNft, { error: getNftError, data: nft }] = useGetBackendNft();

  useEffect(() => {
    if (tokenId && !isError && !getNftError) {
      requestGetNft({
        blockchain: 'NEAR' as Blockchain,
        id: tokenId,
      });
    }
  }, [isError, getNftError, requestGetNft, tokenId]);

  // if nft does not exist in kiruna, create it
  const { useGetNft: useGetNearNft } = useNear();
  const [requestGetNearNft, { error: getNearNftError, data: nftInNear }] =
    useGetNearNft();

  const [requestCreateNft, { error: createNftError, data: createdNft }] =
    useCreateNft();

  useEffect(() => {
    if (!nftInNear && getNftError?.status === 404) {
      requestGetNearNft(tokenId!);
    }
  }, [getNftError, requestGetNearNft, tokenId, nftInNear]);

  useEffect(() => {
    if (getNearNftError?.status === 404) {
      setIsDialogOpen(true);
      setDialogMessage('The NFT could not be found in Near. Did you mint it?');
    }
  }, [getNearNftError]);

  useEffect(() => {
    if (nftInNear && !createNftError) {
      requestCreateNft(nftInNear);
    }
  }, [nftInNear, createNftError, requestCreateNft]);

  useEffect(() => {
    if (createNftError) {
      setIsDialogOpen(true);
      setDialogMessage(
        'The NFT could not be created in Kirunalabs. Contact Kirunalabs',
      );
    }
  }, [createNftError]);

  // if nft exists in kiruna, check if it is published in market
  const { useIsNftPublished } = useNear();
  const [requestIsNftPublished, { data: isNftPublished }] = useIsNftPublished();

  useEffect(() => {
    if (nft || createdNft) {
      requestIsNftPublished(tokenId!);
    }
  }, [nft, createdNft, requestIsNftPublished, tokenId]);

  // if nft is not published in market, show button
  const { publishNft } = useNear();

  const handlePublish = () => {
    publishNft(nftInNear!);
  };

  // if nft is published in market, show unpublish button
  const { unpublishNft } = useNear();

  const handleUnpublish = () => {
    unpublishNft(nftInNear!);
  };

  return (
    <Fragment>
      <KirunaDialog
        isOpen={isDialogOpen}
        titleText={dialogTitle}
        contentText={dialogMessage}
      />
      {(nft || createdNft) && !isNftPublished && (
        <Button onClick={handlePublish}>Publish</Button>
      )}
      {(nft || createdNft) && isNftPublished && (
        <Button onClick={handleUnpublish}>Unpublish</Button>
      )}
    </Fragment>
  );
};

export { CreateNftFallback };
