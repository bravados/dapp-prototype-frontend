import { useRouter } from 'next/router';
import { CreateNft } from '@screens/CreateNft/near';
import { MainLayout } from 'components/layouts';
import { CreateNftFallback } from '@screens/CreateNftFallback/near';
import { WalletConnectedRoute } from '@screens/WalletConnectedRoute';

const Mint = () => {
  const { query } = useRouter();

  const isError = !!query?.errorCode;
  const tokenId = query?.signMeta as string;

  return (
    <MainLayout>
      <WalletConnectedRoute>
        {!isError && !tokenId ? (
          <CreateNft />
        ) : (
          <CreateNftFallback isError={isError} tokenId={tokenId} />
        )}
      </WalletConnectedRoute>
    </MainLayout>
  );
};

export default Mint;
