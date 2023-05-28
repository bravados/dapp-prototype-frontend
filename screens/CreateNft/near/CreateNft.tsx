import { Fragment, useEffect, useState } from 'react';
import { MINT_DEPOSIT, useNear } from '@infrastructure/blockchain/near';
import { useKirunalabs } from '@screens/KirunalabsContext';
import { KirunaDialog } from '@ui/viewComponents/KirunaDialog';
import { CreateNftForm } from '@ui/viewComponents';
import { useCreateFile } from '@application/file';
import { useDeleteFile } from '@application/file/deleteFile.usecase';

const kirunalabsUrl = process.env.NEXT_PUBLIC_KIRUNALABS_FALLBACK_URL;

const ipfsUrl = 'https://cloudflare-ipfs.com/ipfs';

const fallbackUrl = `${kirunalabsUrl}/mint/near`;

const CreateNft = () => {
  const { formatAmount, mint, isSignedIn } = useNear();

  const { user } = useKirunalabs();

  const [ipfsFileId, setIpfsFileId] = useState<string>();

  const [fileUrl, setFileUrl] = useState<string>();

  const [dialogMessage, setDialogMessage] = useState('');

  // check if the user is an artist and has royalties set
  useEffect(() => {
    if (!user || user.type !== 'ARTIST') {
      setDialogMessage('Make sure that Kirunalabs granted you "Artist" role');
    } else if (!user.royalties) {
      setDialogMessage(
        'Royalties are not set for your account. Contact Kirunalabs',
      );
    } else {
      setDialogMessage('');
    }
  }, [isSignedIn, user]);

  // handle create the nft in IPFS
  const [
    requestCreateFile,
    { loading: createFileLoading, error: createFileError, data: ipfsFile },
  ] = useCreateFile();

  const onFileChange = (file: any) => {
    requestCreateFile({ file: file });
  };

  useEffect(() => {
    if (ipfsFile) {
      setIpfsFileId(ipfsFile.cid);
      setFileUrl(`${ipfsUrl}/${ipfsFile.cid}`);
    }
    if (createFileError) {
      setDialogMessage(
        'The image could not be uploaded to IPFS. Contact Kirunalabs',
      );
    }
  }, [ipfsFile, createFileError]);

  // handle delete the nft in IPFS
  const [
    requestDeleteFile,
    {
      loading: deleteFileLoading,
      error: deleteFileError,
      success: deleteFileSuccess,
    },
  ] = useDeleteFile();

  const onFileDelete = () => {
    if (ipfsFileId) {
      requestDeleteFile({ cid: ipfsFileId });
    }
  };

  useEffect(() => {
    if (deleteFileError) {
      setDialogMessage(
        'The image could not be deleted from IPFS. Contact Kirunalabs',
      );
    }
  }, [deleteFileError]);

  useEffect(() => {
    if (deleteFileSuccess) {
      setFileUrl('');
    }
  }, [deleteFileSuccess]);

  // handle minting
  const onSubmit = (title: string, description: string) => {
    mint({
      title,
      description,
      nftStorageId: ipfsFileId!,
      royalties: user!.royalties,
      callbackUrl: fallbackUrl,
    });
  };

  return (
    <Fragment>
      <KirunaDialog
        isOpen={!!dialogMessage}
        title="An error occured"
        content={dialogMessage}
      />
      <CreateNftForm
        fileUrl={fileUrl}
        estimatedCost={formatAmount(MINT_DEPOSIT)}
        isFileLoading={createFileLoading || deleteFileLoading}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
        onFileRemove={onFileDelete}
      />
    </Fragment>
  );
};

export { CreateNft };
