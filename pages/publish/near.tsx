import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { PublishNft } from '@screens/PublishNft';

const Publish = () => {
  const { query } = useRouter();

  const tokenId = query?.tokenId as string;

  return (
    <MainLayout>
      <PublishNft tokenId={tokenId} />
    </MainLayout>
  );
};

export default Publish;
