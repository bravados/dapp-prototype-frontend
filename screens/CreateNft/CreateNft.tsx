import { Fragment, useEffect, useState } from 'react';
import { useNear } from '@infrastructure/blockchain/near';
import { useKirunalabs } from '@screens/KirunalabsContext';
import { KirunaDialog } from '@ui/viewComponents/KirunaDialog';
import { CreateNftForm } from '@ui/viewComponents';
import { useCreateFile } from '@application/file';

const CreateNft = () => {
  const { gasFees, formatAmount, mint, isSignedIn } = useNear();

  const { user } = useKirunalabs();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [nftStorageId, setNftStorageId] = useState<string>();

  const [requestCreateFile, { error: createFileError, data: ipfsFile }] =
    useCreateFile();

  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (!isSignedIn) {
      setDialogMessage('Make sure that your wallet is signed in');
    } else if (!user || user.type !== 'ARTIST') {
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
      setNftStorageId(ipfsFile.cid);
    }
    if (createFileError) {
      setDialogMessage(
        'The image could not be uploaded to IPFS. Contact Kirunalabs',
      );
    }
  }, [ipfsFile, createFileError]);

  const onFileChanged = (file: any) => {
    setUploadedFile(file);
    requestCreateFile({ file: file });
  };

  const onSubmit = (title: string, description: string) => {
    mint({
      title,
      description,
      nftStorageId: nftStorageId!,
      royalties: user!.royalties,
      callbackUrl: 'https://kirunalabs.io',
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
        file={uploadedFile}
        gasFees={formatAmount(gasFees || '0')}
        isFileUploaded={!!nftStorageId}
        onSubmit={onSubmit}
        onFileChanged={onFileChanged}
      />
    </Fragment>
  );
};

export { CreateNft };
