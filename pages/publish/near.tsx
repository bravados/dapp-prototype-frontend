import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { PublishNft } from '@screens/PublishNft';
import { WalletConnectedRoute } from '@screens/WalletConnectedRoute';

const Publish = () => {
  const { query } = useRouter();

  const tokenId = query?.tokenId as string;

  return (
    <MainLayout>
      <WalletConnectedRoute>
        <PublishNft tokenId={tokenId} />
      </WalletConnectedRoute>
    </MainLayout>
  );
};

export default Publish;
