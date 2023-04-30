import { Fragment, useEffect, useState } from 'react';
import { MINT_DEPOSIT, useNear } from '@infrastructure/blockchain/near';
import { useKirunalabs } from '@screens/KirunalabsContext';
import { KirunaDialog } from '@ui/viewComponents/KirunaDialog';
import { CreateNftForm } from '@ui/viewComponents';
import { useCreateFile } from '@application/file';

const kirunalabsUrl = process.env.NEXT_PUBLIC_KIRUNALABS_FALLBACK_URL;

const ipfsUrl = 'https://cloudflare-ipfs.com/ipfs';

const fallbackUrl = `${kirunalabsUrl}/mint/near`;

const CreateNft = () => {
  const { formatAmount, mint, isSignedIn } = useNear();

  const { user } = useKirunalabs();

  const [ipfsFileId, setIpfsFileId] = useState<string>();

  const [fileUrl, setFileUrl] = useState<string>();

  const [requestCreateFile, { error: createFileError, data: ipfsFile }] =
    useCreateFile();

  const [dialogMessage, setDialogMessage] = useState('');

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

  const onFileChange = (file: any) => {
    requestCreateFile({ file: file });
  };

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
        titleText="An error occured"
        contentText={dialogMessage}
      />
      <CreateNftForm
        fileUrl={fileUrl}
        estimatedCost={formatAmount(MINT_DEPOSIT)}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
    </Fragment>
  );
};

export { CreateNft };
