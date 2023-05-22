import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NftAdapter } from '@services/nfts/nft.adapter';
import { NftBackend } from '@domain/nft/nft';
import { MainLayout } from '@ui/layouts';
import { NearNftScreen } from '@screens/NearNftScreen';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let nftIds: string[] = [];

  try {
    nftIds = await new NftAdapter().getNftIds('NEAR');
  } catch (e) {
    console.log(e);
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
  const nft = await new NftAdapter().getNftByBlockchainById('NEAR', nftId);
  const plainNft = NftBackend.toPlain(nft);

  return {
    props: plainNft,
  };
};

const NftPage = (nft: NftBackend) => {
  return (
    <MainLayout>
      <NearNftScreen preloadedNft={nft} />
    </MainLayout>
  );
};

export default NftPage;
