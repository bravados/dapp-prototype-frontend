import { useGetNfts } from '@application/nft/getNfts.usecase';
import { NftCollection } from '@ui/core/NftCollection';
import { useEffect } from 'react';

const Nfts = () => {
  // get the list of nfts
  const [requestGetNfts, { loading, error, data: nfts }] = useGetNfts();

  useEffect(() => {
    requestGetNfts();
  }, [requestGetNfts]);

  const onClickNft = (blockchain: string, id: string) => {
    window.location.href = `/nfts/${blockchain.toLowerCase()}/${id}`;
  };

  return <NftCollection nfts={nfts ?? []} onClickNft={onClickNft} />;
};

export { Nfts };
