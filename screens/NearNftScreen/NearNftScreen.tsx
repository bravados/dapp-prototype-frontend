import { useEffect, useState } from 'react';
import { NftBackend } from '@domain/nft/nft';
import { useNear } from '@infrastructure/blockchain/near';
import { useGetUser } from '@application/user';
import { NftProfile } from '@ui/viewComponents/NftProfile';

type NftOwner = {
  id?: number;
  name: string;
  avatar?: string;
};

type Props = {
  preloadedNft: NftBackend;
};

const NearNftScreen = ({ preloadedNft }: Props) => {
  const { creator } = preloadedNft;

  // get the current owner of the NFT according to the contract
  const [owner, setOwner] = useState<NftOwner>();
  const { useGetNft } = useNear();
  const [requestGetNft, { error: getNftError, data: nearNft }] = useGetNft();

  useEffect(() => {
    if (preloadedNft && !nearNft && !getNftError)
      requestGetNft(preloadedNft.id);
  }, [preloadedNft]);

  useEffect(() => {
    if (getNftError) {
      console.error(getNftError);
    }
  }, [getNftError]);

  // get the user profile of the owner (it may not exist in Kiruna)
  const [
    requestOwnerProfile,
    { loading: loadingOwner, error: requestOwnerError, data: ownerProfile },
  ] = useGetUser();

  useEffect(() => {
    if (nearNft && !ownerProfile && !requestOwnerError) {
      requestOwnerProfile({ blockchain: 'NEAR', address: nearNft.owner });
    }
  }, [nearNft]);

  useEffect(() => {
    if (requestOwnerError) {
      console.log(
        `the owner of nft ${nearNft?.id} does not have a profile in Kiruna`,
      );
      setOwner({ name: nearNft!.owner });
    }
  }, [nearNft]);

  useEffect(() => {
    if (ownerProfile && !owner?.id) {
      setOwner({
        id: ownerProfile.id,
        name: ownerProfile.name,
        avatar: ownerProfile.avatar,
      });
    }
  }, [ownerProfile, owner]);

  // get the account balance of the user
  const { accountBalance, formatAmount } = useNear();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (accountBalance && formatAmount) {
      setBalance(formatAmount(accountBalance));
    }
  }, [accountBalance, formatAmount]);

  // get the price of the NFT (if published on the marketplace)
  const [price, setPrice] = useState<string>();

  const { useGetSale } = useNear();
  const [requestGetSale, { data: sale }] = useGetSale();

  useEffect(() => {
    if (preloadedNft) requestGetSale(preloadedNft.id);
  }, [preloadedNft]);

  useEffect(() => {
    if (sale) {
      setPrice(formatAmount(sale.price));
    }
  }, [sale, formatAmount]);

  return (
    <NftProfile
      title={preloadedNft.title}
      description={preloadedNft.description}
      media={preloadedNft.media}
      creator={preloadedNft.creator}
      owner={owner!}
      accountBalance={balance!}
      price={price}
    />
  );
};

export { NearNftScreen };
