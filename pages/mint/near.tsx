import { useRouter } from 'next/router';
import { CreateNft } from '@screens/CreateNft/near';
import { MainLayout } from 'components/layouts';
import { CreateNftFallback } from '@screens/CreateNftFallback/near';

const Mint = () => {
  const { query } = useRouter();

  const isError = !!query?.errorCode;
  const tokenId = query?.signMeta as string;

  return (
    <MainLayout>
      {!isError && !tokenId ? (
        <CreateNft />
      ) : (
        <CreateNftFallback isError={isError} tokenId={tokenId} />
      )}
    </MainLayout>
  );
};

export default Mint;
