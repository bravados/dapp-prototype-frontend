import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NftAdapter } from '@services/nfts/nft.adapter';
import { NftBackend } from '@domain/nft/nft';
import { MainLayout } from '@ui/layouts';
import { NearNftScreen } from '@screens/NearNftScreen';
import { defaultNft } from '@domain/nft/__mocks__';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let nftIds: string[] = [];

  try {
    nftIds = await new NftAdapter().getNftIds('NEAR');
  } catch (e) {
    console.log('pages/nfts/near/[id].tsx: BE is down. Using mock id');

    // if service is unavailable, we fallback to the default nft
    nftIds = [defaultNft.id];
  }

  return {
    paths: nftIds.map((id) => ({ params: { id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}: GetStaticPropsContext<Params>) => {
  const nftId = params!.id;
  let nft, plainNft;

  try {
    nft = await new NftAdapter().getNftByBlockchainById('NEAR', nftId);
  } catch (e) {
    console.log('pages/nfts/near/[id].tsx: BE is down. Using mock nft');

    // if service is unavailable, we fallback to the default nft
    nft = defaultNft;
  }

  plainNft = NftBackend.toPlain(nft);

  return {
    props: plainNft,
  };
};

const NftPage = (nft: NftBackend) => {
  // even with the default nft, Nextjs passes an empty nft {}. The children components crash
  if (Object.keys(nft).length === 0) {
    return null;
  }

  return (
    <MainLayout>
      <NearNftScreen preloadedNft={nft} />
    </MainLayout>
  );
};

export default NftPage;
